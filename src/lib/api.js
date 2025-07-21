import { cache } from 'react';

export const getNavigation = cache(async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiUrl = `${baseUrl}/api/navigation`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`Failed to fetch. Status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("API Error (getNavigation):", error);
        return [];
    }
});

export const getCheckoutOptions = cache(async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkout/all-options`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 }  });
        if (!res.ok) throw new Error(`Failed to fetch checkout options: ${res.statusText}`);
        return await res.json();
    } catch (error) {
        console.error("API Error (getCheckoutOptions):", error);
        return { deliveryOptions: {}, paymentMethods: {} };
    }
});

export const getIconLinks = cache(async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content/icon-links`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`Не удалось загрузить иконки: ${res.statusText}`);
        const data = await res.json();
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        return data.map(icon => ({...icon, image: `${baseUrl}${icon.image}`}));
    } catch (error) {
        console.error("Ошибка API (getIconLinks):", error);
        return [];
    }
});

export const getReelGalleryImages = cache(async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content/reel-gallery`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 }  });
        if (!res.ok) throw new Error(`Не удалось загрузить изображения для галереи: ${res.statusText}`);
        const data = await res.json();
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        return data.map(imageUrl => `${baseUrl}${imageUrl}`);
    } catch (error) {
        console.error("Ошибка API (getReelGalleryImages):", error);
        return [];
    }
});

export const getFeaturedProducts = cache(async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/featured`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 }  });
        if (!res.ok) throw new Error(`Не удалось загрузить избранные продукты: ${res.statusText}`);
        const data = await res.json();
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        return data.map(item => ({...item, url: `${baseUrl}${item.url}`}));
    } catch (error) {
        console.error("Ошибка API (getFeaturedProducts):", error);
        return [];
    }
});

export const getSnakeGallery = cache(async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content/snake-gallery`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`Не удалось загрузить галерею для змейки: ${res.statusText}`);
        const data = await res.json();
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        return data.map(image => ({...image, top: `${baseUrl}${image.top}`, bottom: `${baseUrl}${image.bottom}`}));
    } catch (error) {
        console.error("Ошибка API (getSnakeGallery):", error);
        return [];
    }
});

export const getMobileSliderImages = cache(async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content/mobile-slider`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 }  });
        if (!res.ok) throw new Error(`Не удалось загрузить изображения для слайдера: ${res.statusText}`);
        const data = await res.json();
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        return data.map(slide => ({...slide, url: `${baseUrl}${slide.url}`}));
    } catch (error) {
        console.error("Ошибка API (getMobileSliderImages):", error);
        return [];
    }
});

export const getHomepageContent = cache(async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content/homepage`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 }  });
        if (!res.ok) throw new Error(`Не удалось загрузить контент для главной страницы: ${res.statusText}`);
        const data = await res.json();
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const processElements = (elements) => elements.map(el => el.type === 'image' && el.src ? { ...el, src: `${baseUrl}${el.src}` } : el);
        return {
            paralaxSet1: processElements(data.paralaxSet1 || []),
            paralaxSet2: processElements(data.paralaxSet2 || []),
            paralaxSet3: processElements(data.paralaxSet3 || []),
        };
    } catch (error) {
        console.error("Ошибка API (getHomepageContent):", error);
        return { paralaxSet1: [], paralaxSet2: [], paralaxSet3: [] };
    }
});

export const getProductById = async (id) => {
    if (!id) return null;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 }  });
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`Не удалось загрузить продукт: ${res.statusText}`);
        }
        const product = await res.json();
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        if (product.images && Array.isArray(product.images)) {
            product.images = product.images.map(imgPath => `${baseUrl}${imgPath}`);
        }
        return product;
    } catch (error) {
        console.error(`Ошибка API (getProductById, id: ${id}):`, error);
        return null;
    }
};

export const getProducts = async (params = {}) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`);
    if (params.category) url.searchParams.append('category', params.category);
    if (params.collection) url.searchParams.append('collection', params.collection);
    if (params.sort) url.searchParams.append('sort', params.sort);
    if (params.page) url.searchParams.append('page', params.page);
    if (params.limit) url.search_params.append('limit', params.limit);

    try {
        const res = await fetch(url.toString(), { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`Не удалось загрузить продукты: ${res.status} ${res.statusText}`);
        const data = await res.json();
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const formattedProducts = data.products.map(product => ({...product, image: product.previewImage ? `${baseUrl}${product.previewImage}` : undefined}));
        return { ...data, products: formattedProducts };
    } catch (error) {
        console.error("Ошибка API (getProducts):", error);
        return { products: [], totalProducts: 0, totalPages: 1, currentPage: 1 };
    }
};

export const getArchivedProducts = cache(async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/archive`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`Не удалось загрузить архив: ${res.statusText}`);

        const data = await res.json();

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        if (data.products && Array.isArray(data.products)) {
            return data.products
                .map(product => {
                    if (product.id && product.previewImage) {
                        return {
                            id: product.id,
                            image: `${baseUrl}${product.previewImage}`
                        };
                    }
                    return null;
                })
        }

        return [];
    } catch (error) {
        console.error("Ошибка API (getArchivedProducts):", error);
        return [];
    }
});