import { cache } from 'react';

// Два разных базовых адреса — это важно для прод-схемы за nginx:
//
//  ASSET_BASE  — префикс для ССЫЛОК НА КАРТИНКИ (/uploads/...).
//                ВАЖНО (после включения оптимизации next/image, см.
//                next.config.mjs): относительный путь вида "/uploads/x.png"
//                next/image трактует как ЛОКАЛЬНЫЙ файл, который должен
//                физически лежать на диске ФРОНТЕНД-контейнера — а его там
//                нет, он лежит в volume БЭКЕНДА. Из-за этого
//                /_next/image?url=%2Fuploads%2F... отвечал 400.
//                Поэтому картинкам нужен АБСОЛЮТНЫЙ URL:
//                  - на сервере (SSR/ISR внутри контейнера) — внутренний
//                    адрес backend-контейнера в докер-сети, в обход
//                    публичного домена и nginx;
//                  - в браузере (напр. клиентская пагинация каталога) —
//                    текущий origin страницы (тот же публичный домен, тот
//                    же сертификат, никакого CORS).
//
//  FETCH_BASE  — куда уходят сами запросы к API. На СЕРВЕРЕ (ISR/SSR внутри
//                контейнера) лучше ходить во внутренний адрес backend-контейнера
//                (http://backend:5050), минуя публичный домен. В БРАУЗЕРЕ
//                (клиентский fetch, напр. пагинация каталога) — публичный/
//                относительный адрес.
//
// Env:
//   NEXT_PUBLIC_API_BASE_URL  — публичный origin (браузер). Локально
//                               http://localhost:5050; в проде '' (относительный).
//   INTERNAL_API_BASE_URL     — внутренний origin бэка для серверных запросов.
//                               Прод: http://backend:5050. Локально можно не
//                               задавать — возьмётся публичный.
const isServer = typeof window === 'undefined';

const ASSET_BASE = isServer
    ? (process.env.INTERNAL_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '')
    : (process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin);

const FETCH_BASE = isServer
    ? (process.env.INTERNAL_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '')
    : (process.env.NEXT_PUBLIC_API_BASE_URL || '');

// Совместимость со старым кодом, где префикс картинок звался BASE_URL.
const BASE_URL = ASSET_BASE;

// Логотип точки продаж может быть либо загружен в админку (/uploads/...),
// либо вставлен внешней ссылкой (напр. avatars.mds.yandex.net/...). Абсолютные
// URL отдаём как есть, относительные — префиксуем публичным origin.
const isAbsoluteUrl = (u) => typeof u === 'string' && /^(https?:)?\/\//i.test(u);
const withAssetBase = (u) => (!u ? '' : isAbsoluteUrl(u) ? u : `${BASE_URL}${u}`);

// Стратегия кэша ISR:
//  - revalidate: фоновое обновление по таймеру (сек);
//  - tags: позволяют точечно сбрасывать кэш по событию из админки
//    через POST /api/revalidate (см. src/app/api/revalidate/route.js).
// Маркетинг/навигация меняются редко -> длинный revalidate + тег;
// каталог/товары/архив -> короткий revalidate + тег.
const TAGS = {
    navigation: 'navigation',
    content: 'content',
    checkout: 'checkout',
    products: 'products',
};

const REVALIDATE = {
    navigation: 60,
    content: 60,
    checkout: 60,
    products: 60,
};

// Унифицированный fetch с понятной обработкой ошибок и тегами кэша.
async function apiFetch(path, { tags = [], revalidate = 60, fallback = null } = {}) {
    const url = `${FETCH_BASE}${path}`;
    try {
        const res = await fetch(url, { next: { revalidate, tags } });
        if (!res.ok) {
            if (res.status === 404) return { notFound: true };
            throw new Error(`Fetch ${path} failed: ${res.status} ${res.statusText}`);
        }
        return { data: await res.json() };
    } catch (error) {
        console.error(`API Error (${path}):`, error);
        return { error, data: fallback };
    }
}

export const getNavigation = cache(async () => {
    const { data } = await apiFetch('/api/navigation', {
        tags: [TAGS.navigation], revalidate: REVALIDATE.navigation, fallback: [],
    });
    return data ?? [];
});

export const getCheckoutOptions = cache(async () => {
    const { data } = await apiFetch('/api/checkout/all-options', {
        tags: [TAGS.checkout], revalidate: REVALIDATE.checkout,
        fallback: { deliveryOptions: {}, paymentMethods: {} },
    });
    return data ?? { deliveryOptions: {}, paymentMethods: {} };
});

export const getIconLinks = cache(async () => {
    const { data } = await apiFetch('/api/content/icon-links', {
        tags: [TAGS.content], revalidate: REVALIDATE.content, fallback: [],
    });
    if (!Array.isArray(data)) return [];
    return data.map(icon => ({ ...icon, image: `${BASE_URL}${icon.image}` }));
});

export const getReelGalleryImages = cache(async () => {
    const { data } = await apiFetch('/api/content/reel-gallery', {
        tags: [TAGS.content], revalidate: REVALIDATE.content, fallback: [],
    });
    if (!Array.isArray(data)) return [];
    return data.map(imageUrl => `${BASE_URL}${imageUrl}`);
});

// Видео-половина галереи (фото — getReelGalleryImages). Бэк отдаёт только
// реальные видео (без превью-плейсхолдера), поэтому массив может быть пустым —
// в этом случае фронт просто не рендерит видео-секцию.
export const getVideoGallery = cache(async () => {
    const { data } = await apiFetch('/api/content/video-gallery', {
        tags: [TAGS.content], revalidate: REVALIDATE.content, fallback: [],
    });
    if (!Array.isArray(data)) return [];
    return data.map(videoUrl => `${BASE_URL}${videoUrl}`);
});

// Точки продаж для страницы /contacts. Бэк отдаёт массив магазинов-партнёров,
// где представлены изделия. Логотип может быть загруженным файлом или внешней
// ссылкой — нормализуем оба случая. Карта хранится как iframe src (или полный
// <iframe> — фронт сам извлечёт src). Пустой массив → секция не рендерится.
export const getSalesPoints = cache(async () => {
    const { data } = await apiFetch('/api/content/sales-points', {
        tags: [TAGS.content], revalidate: REVALIDATE.content, fallback: [],
    });
    if (!Array.isArray(data)) return [];
    return data.map(p => ({
        ...p,
        logoUrl: withAssetBase(p.logoUrl || p.logo || ''),
    }));
});

export const getFeaturedProducts = cache(async () => {
    const { data } = await apiFetch('/api/products/featured', {
        tags: [TAGS.products], revalidate: REVALIDATE.products, fallback: [],
    });
    if (!Array.isArray(data)) return [];
    return data.map(item => ({ ...item, url: `${BASE_URL}${item.url}` }));
});

export const getSnakeGallery = cache(async () => {
    const { data } = await apiFetch('/api/content/snake-gallery', {
        tags: [TAGS.content], revalidate: REVALIDATE.content, fallback: [],
    });
    if (!Array.isArray(data)) return [];
    return data.map(image => ({
        ...image,
        top: `${BASE_URL}${image.top}`,
        bottom: `${BASE_URL}${image.bottom}`,
    }));
});

export const getMobileSliderImages = cache(async () => {
    const { data } = await apiFetch('/api/content/mobile-slider', {
        tags: [TAGS.content], revalidate: REVALIDATE.content, fallback: [],
    });
    if (!Array.isArray(data)) return [];
    return data.map(slide => ({ ...slide, url: `${BASE_URL}${slide.url}` }));
});

export const getHomepageContent = cache(async () => {
    const { data } = await apiFetch('/api/content/homepage', {
        tags: [TAGS.content], revalidate: REVALIDATE.content,
        fallback: { paralaxSet1: [], paralaxSet2: [], paralaxSet3: [] },
    });
    const safe = data ?? { paralaxSet1: [], paralaxSet2: [], paralaxSet3: [] };
    const processElements = (elements = []) =>
        elements.map(el => el.type === 'image' && el.src ? { ...el, src: `${BASE_URL}${el.src}` } : el);
    return {
        paralaxSet1: processElements(safe.paralaxSet1 || []),
        paralaxSet2: processElements(safe.paralaxSet2 || []),
        paralaxSet3: processElements(safe.paralaxSet3 || []),
    };
});

// Custom-блок (КАСТОМ): 3 картинки + текст {ru,en}. Картинки префиксуем
// публичным origin. Пустой текст / превью-картинки фронт заменяет дефолтами
// из home-page.data.js (см. mergeCustomWithContent в page.js).
export const getCustom = cache(async () => {
    const { data } = await apiFetch('/api/content/custom', {
        tags: [TAGS.content], revalidate: REVALIDATE.content,
        fallback: { images: [], text: { ru: '', en: '' } },
    });
    const safe = data ?? { images: [], text: { ru: '', en: '' } };
    return {
        images: (safe.images || []).map(src => `${BASE_URL}${src}`),
        text: safe.text || { ru: '', en: '' },
    };
});

export const getProductById = async (id) => {
    if (!id) return null;
    const { data, notFound } = await apiFetch(`/api/products/${id}`, {
        tags: [TAGS.products, `product-${id}`], revalidate: REVALIDATE.products,
    });
    if (notFound || !data) return null;
    const product = data;
    if (product.images && Array.isArray(product.images)) {
        product.images = product.images.map(imgPath => `${BASE_URL}${imgPath}`);
    }
    return product;
};

export const getProducts = async (params = {}) => {
    const search = new URLSearchParams();
    if (params.category) search.append('category', params.category);
    if (params.collection) search.append('collection', params.collection);
    if (params.sort) search.append('sort', params.sort);
    if (params.page) search.append('page', params.page);
    if (params.limit) search.append('limit', params.limit); // был баг: url.search_params
    const qs = search.toString();
    const path = `/api/products${qs ? `?${qs}` : ''}`;

    const fallback = { products: [], totalProducts: 0, totalPages: 1, currentPage: 1 };
    const { data } = await apiFetch(path, {
        tags: [TAGS.products], revalidate: REVALIDATE.products, fallback,
    });
    const safe = data ?? fallback;
    const formattedProducts = (safe.products || []).map(product => ({
        ...product,
        image: product.previewImage ? `${BASE_URL}${product.previewImage}` : undefined,
    }));
    return { ...safe, products: formattedProducts };
};

export const getArchivedProducts = cache(async () => {
    const { data } = await apiFetch('/api/products/archive', {
        tags: [TAGS.products], revalidate: REVALIDATE.products, fallback: { products: [] },
    });
    const products = data?.products;
    if (!Array.isArray(products)) return [];
    return products
        .filter(p => p.id && p.previewImage)
        .map(p => ({ id: p.id, image: `${BASE_URL}${p.previewImage}` }));
});