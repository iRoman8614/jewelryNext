// src/lib/catalog.data.js

import { collections } from './nav.data.js';

export const categoryPageData = {
    'rings': { title: 'Кольца', subtitle: 'Основа нашего бренда...', description: 'Кольцо — это больше, чем украшение...' },
    'bracelets': { title: 'Браслеты', description: 'Элегантные и стильные браслеты...' },
    'earrings': { title: 'Серьги', description: 'От классических гвоздиков до роскошных подвесок...' },
    'pendants': { title: 'Подвески', description: 'Уникальные подвески из нашей коллекции.' },
    'necklaces': { title: 'Ожерелья', description: 'Подчеркните свою шею изящными ожерельями.' },
};

const allProducts = [
    // === КОЛЬЦА (RINGS) ===
    // Коллекция "Заря" (zarya) - 5 товаров
    { id: 'ring-zarya-1', category: 'rings', collection: 'zarya', image: '/images/item3.png', name: 'Аврора', price: '35000', size: '16.5', weight: '3.1г', material: 'Серебро, гранат' },
    { id: 'ring-zarya-2', category: 'rings', collection: 'zarya', image: '/images/item5.png', name: 'Солярис', price: '38000', size: '17.0', weight: '3.5г', material: 'Серебро, цитрин' },
    { id: 'ring-zarya-3', category: 'rings', collection: 'zarya', image: '/images/item9.png', name: 'Гелиос', price: '32000', size: '18.0', weight: '2.9г', material: 'Черненое серебро' },
    { id: 'ring-zarya-4', category: 'rings', collection: 'zarya', image: '/images/item11.png', name: 'Рассвет', price: '36000', size: '16.0', weight: '3.3г', material: 'Серебро, розовый кварц' },
    { id: 'ring-zarya-5', category: 'rings', collection: 'zarya', image: '/images/item4.png', name: 'Зенит', price: '39000', size: '17.5', weight: '3.8г', material: 'Серебро, перидот' },

    // Коллекция "Луна" (luna) - 6 товаров
    { id: 'ring-luna-1', category: 'rings', collection: 'luna', image: '/images/item2.png', name: 'Селена', price: '41000', size: '17.0', weight: '4.2г', material: 'Матовое серебро, лунный камень' },
    { id: 'ring-luna-2', category: 'rings', collection: 'luna', image: '/images/item10.png', name: 'Эндимион', price: '45000', size: '18.5', weight: '5.1г', material: 'Черненое серебро, лабрадорит' },
    { id: 'ring-luna-3', category: 'rings', collection: 'luna', image: '/images/item12.png', name: 'Лилит', price: '43000', size: '16.5', weight: '4.5г', material: 'Серебро, черный оникс' },
    { id: 'ring-luna-4', category: 'rings', collection: 'luna', image: '/images/item6.png', name: 'Ноктюрн', price: '40000', size: '17.5', weight: '4.0г', material: 'Серебро' },
    { id: 'ring-luna-5', category: 'rings', collection: 'luna', image: '/images/item1.png', name: 'Фаза', price: '42000', size: '18.0', weight: '4.8г', material: 'Серебро, белый агат' },
    { id: 'ring-luna-6', category: 'rings', collection: 'luna', image: '/images/item3.png', name: 'Тень', price: '46000', size: '19.0', weight: '5.5г', material: 'Оксидированное серебро' },

    // === БРАСЛЕТЫ (BRACELETS) ===
    // Коллекция "Река" (reka) - 5 товаров
    { id: 'bracelet-reka-1', category: 'bracelets', collection: 'reka', image: '/images/item5.png', name: 'Поток', price: '52000', size: '18см', weight: '12.1г', material: 'Полированное серебро' },
    { id: 'bracelet-reka-2', category: 'bracelets', collection: 'reka', image: '/images/item6.png', name: 'Изгиб', price: '55000', size: '19см', weight: '13.5г', material: 'Серебро' },
    { id: 'bracelet-reka-3', category: 'bracelets', collection: 'reka', image: '/images/item7.png', name: 'Дельта', price: '53000', size: '17.5см', weight: '11.8г', material: 'Серебро с чернением' },
    { id: 'bracelet-reka-4', category: 'bracelets', collection: 'reka', image: '/images/item9.png', name: 'Ручей', price: '49000', size: '17см', weight: '10.2г', material: 'Серебро' },
    { id: 'bracelet-reka-5', category: 'bracelets', collection: 'reka', image: '/images/item12.png', name: 'Источник', price: '58000', size: '18.5см', weight: '14.0г', material: 'Серебро, аквамарин' },

    // Коллекция "Лес" (les) - 7 товаров
    { id: 'bracelet-les-1', category: 'bracelets', collection: 'les', image: '/images/item8.png', name: 'Кора', price: '61000', size: '19см', weight: '15.5г', material: 'Текстурное серебро' },
    { id: 'bracelet-les-2', category: 'bracelets', collection: 'les', image: '/images/item9.png', name: 'Ветвь', price: '59000', size: '18см', weight: '14.2г', material: 'Серебро с чернением' },
    { id: 'bracelet-les-3', category: 'bracelets', collection: 'les', image: '/images/item2.png', name: 'Листва', price: '63000', size: '18.5см', weight: '16.1г', material: 'Серебро, зеленый агат' },
    { id: 'bracelet-les-4', category: 'bracelets', collection: 'les', image: '/images/item4.png', name: 'Мох', price: '60000', size: '19.5см', weight: '15.8г', material: 'Матовое серебро' },
    { id: 'bracelet-les-5', category: 'bracelets', collection: 'les', image: '/images/item1.png', name: 'Тропа', price: '58000', size: '18см', weight: '13.9г', material: 'Серебро' },
    { id: 'bracelet-les-6', category: 'bracelets', collection: 'les', image: '/images/item6.png', name: 'Корень', price: '65000', size: '20см', weight: '17.0г', material: 'Оксидированное серебро' },
    { id: 'bracelet-les-7', category: 'bracelets', collection: 'les', image: '/images/item7.png', name: 'Чаща', price: '68000', size: '19см', weight: '18.2г', material: 'Черненое серебро, турмалин' },

    // === СЕРЬГИ (EARRINGS) ===
    // И так далее для остальных категорий...
    { id: 'earring-veter-1', category: 'earrings', collection: 'veter', image: '/images/item1.png', name: 'Шепот', price: '28000' },
    { id: 'earring-veter-2', category: 'earrings', collection: 'veter', image: '/images/item2.png', name: 'Порыв', price: '31000' },
    { id: 'earring-veter-3', category: 'earrings', collection: 'veter', image: '/images/item4.png', name: 'Бриз', price: '29000' },
    { id: 'earring-veter-4', category: 'earrings', collection: 'veter', image: '/images/item6.png', name: 'Вихрь', price: '33000' },
    { id: 'earring-veter-5', category: 'earrings', collection: 'veter', image: '/images/item7.png', name: 'Эфир', price: '27000' },

    // === ПОДВЕСКИ (PENDANTS) ===
    { id: 'pendant-king-1', category: 'pendants', collection: 'king', image: '/images/item10.png', name: 'Корона', price: '48000' },
    { id: 'pendant-king-2', category: 'pendants', collection: 'king', image: '/images/item11.png', name: 'Скипетр', price: '51000' },
    { id: 'pendant-king-3', category: 'pendants', collection: 'king', image: '/images/item12.png', name: 'Трон', price: '55000' },
    { id: 'pendant-king-4', category: 'pendants', collection: 'king', image: '/images/item9.png', name: 'Мантия', price: '49000' },
    { id: 'pendant-king-5', category: 'pendants', collection: 'king', image: '/images/item8.png', name: 'Держава', price: '53000' },
    { id: 'pendant-king-6', category: 'pendants', collection: 'king', image: '/images/item3.png', name: 'Регалия', price: '50000' },

    // === ОЖЕРЕЛЬЯ (NECKLACES) ===
    { id: 'necklace-taina-1', category: 'necklaces', collection: 'taina', image: '/images/item5.png', name: 'Загадка', price: '75000' },
    { id: 'necklace-taina-2', category: 'necklaces', collection: 'taina', image: '/images/item3.png', name: 'Секрет', price: '79000' },
    { id: 'necklace-taina-3', category: 'necklaces', collection: 'taina', image: '/images/item8.png', name: 'Мистерия', price: '82000' },
    { id: 'necklace-taina-4', category: 'necklaces', collection: 'taina', image: '/images/item9.png', name: 'Шифр', price: '77000' },
    { id: 'necklace-taina-5', category: 'necklaces', collection: 'taina', image: '/images/item10.png', name: 'Иллюзия', price: '85000' },
    { id: 'necklace-taina-6', category: 'necklaces', collection: 'taina', image: '/images/item2.png', name: 'Грёза', price: '81000' },
    { id: 'necklace-taina-7', category: 'necklaces', collection: 'taina', image: '/images/item7.png', name: 'Оракул', price: '88000' },
    { id: 'necklace-taina-8', category: 'necklaces', collection: 'taina', image: '/images/item4.png', name: 'Пророчество', price: '92000' },
];

export const cardTypeSequence = [3, 2, 1, 2, 2, 3, 3, 2, 1, 1, 3, 1];
export const mobileSliderImages = [
    { url: '/images/mobRing.png', alt: 'Слайд 1' },
    { url: '/images/parallax3.png', alt: 'Слайд 2' },
    { url: '/images/parallax4.png', alt: 'Слайд 3' },
];

export async function getCatalogData(categorySlug, collectionSlug) {
    const categoryInfo = categoryPageData[categorySlug] || { title: 'Каталог', description: 'Все наши изделия.' };
    let collectionName = null;
    if (categorySlug && collectionSlug && collections[categorySlug]) {
        const foundCollection = collections[categorySlug].find(c => c.path.endsWith(`/${collectionSlug}`));
        if (foundCollection) {
            collectionName = foundCollection.name;
        }
    }
    let filteredProducts = allProducts;
    if (collectionSlug) {
        filteredProducts = allProducts.filter(p => p.collection === collectionSlug);
    } else if (categorySlug) {
        filteredProducts = allProducts.filter(p => p.category === categorySlug);
    }
    return {
        products: filteredProducts,
        categoryInfo,
        collectionName,
    };
}