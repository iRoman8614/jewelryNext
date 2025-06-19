import { collections } from './nav.data.js';

export const categoryPageData = {
    'rings': {
        title: { ru: 'Кольца', en: 'Rings' },
        subtitle: { ru: 'Основа нашего бренда. Предмет, с которого все началось - КОЛЬЦО', en: 'The core of our brand. The item where it all began - THE RING' },
        description: { ru: 'Кольцо — это больше, чем украшение, это символ истории и индивидуальности. Мы создаем каждое кольцо с вниманием к деталям и мастерством. Оно отражает дух свободы, силу характера и уникальный стиль.', en: 'A ring is more than just jewelry; it is a symbol of history and individuality. We create each ring with attention to detail and craftsmanship. It reflects a spirit of freedom, strength of character, and a unique style.' }
    },
    'bracelets': {
        title: { ru: 'Браслеты', en: 'Bracelets' },
        subtitle: { ru: 'Украшения, что обвивают запястье, соединяя силу и изящество.', en: 'Jewelry that embraces the wrist, connecting strength and grace.' },
        description: { ru: 'Элегантные и стильные браслеты, которые добавят изюминку вашему образу.', en: 'Elegant and stylish bracelets that will add a special touch to your look.' }
    },
    'earrings': {
        title: { ru: 'Серьги', en: 'Earrings' },
        subtitle: { ru: 'Акценты, что обрамляют ваш взгляд и подчеркивают уникальность.', en: 'Accents that frame your gaze and highlight your uniqueness.' },
        description: { ru: 'От классических гвоздиков до роскошных подвесок - найдите свои идеальные серьги.', en: 'From classic studs to luxurious pendants - find your perfect earrings.' }
    },
    'pendants': {
        title: { ru: 'Подвески', en: 'Pendants' },
        subtitle: { ru: 'Символы и истории, которые вы носите близко к сердцу.', en: 'Symbols and stories that you wear close to your heart.' },
        description: { ru: 'Уникальные подвески из нашей коллекции.', en: 'Unique pendants from our collection.' }
    },
    'necklaces': {
        title: { ru: 'Ожерелья', en: 'Necklaces' },
        subtitle: { ru: 'Завершающий штрих вашего образа, воплощенный в металле и камне.', en: 'The finishing touch to your look, embodied in metal and stone.' },
        description: { ru: 'Подчеркните свою шею изящными ожерельями и уникальными подвесками из нашей коллекции.', en: 'Accentuate your neckline with exquisite necklaces and unique pendants from our collection.' }
    },
};

const allProducts = [
    // === КОЛЬЦА (RINGS) ===
    { id: '1', category: 'rings', collection: 'zarya', image: '/images/item3.png', name: { ru: 'Аврора', en: 'Aurora' }, price: '35000', size: '16.5', weight: '3.1г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: '2', category: 'rings', collection: 'zarya', image: '/images/item5.png', name: { ru: 'Солярис', en: 'Solaris' }, price: '38000', size: '17.0', weight: '3.5г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: '3', category: 'rings', collection: 'zarya', image: '/images/item9.png', name: { ru: 'Гелиос', en: 'Helios' }, price: '32000', size: '18.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: '4', category: 'rings', collection: 'zarya', image: '/images/item11.png', name: { ru: 'Рассвет', en: 'Dawn' }, price: '36000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: '5', category: 'rings', collection: 'zarya', image: '/images/item4.png', name: { ru: 'Зенит', en: 'Zenith' }, price: '39000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'}},
    { id: 'ring-luna-1', category: 'rings', collection: 'luna', image: '/images/item2.png', name: { ru: 'Селена', en: 'Selene' }, price: '41000' },
    { id: 'ring-luna-2', category: 'rings', collection: 'luna', image: '/images/item10.png', name: { ru: 'Эндимион', en: 'Endymion' }, price: '45000', size: '17.0', weight: '3.5г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'ring-luna-3', category: 'rings', collection: 'luna', image: '/images/item12.png', name: { ru: 'Лилит', en: 'Lilith' }, price: '43000', size: '18.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'ring-luna-4', category: 'rings', collection: 'luna', image: '/images/item6.png', name: { ru: 'Ноктюрн', en: 'Nocturne' }, price: '40000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'ring-luna-5', category: 'rings', collection: 'luna', image: '/images/item1.png', name: { ru: 'Фаза', en: 'Phase' }, price: '42000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'}},
    { id: 'ring-luna-6', category: 'rings', collection: 'luna', image: '/images/item3.png', name: { ru: 'Тень', en: 'Shadow' }, price: '46000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },

    // === БРАСЛЕТЫ (BRACELETS) ===
    { id: '1', category: 'bracelets', collection: 'reka', image: '/images/item5.png', name: { ru: 'Поток', en: 'Stream' }, price: '52000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: '2', category: 'bracelets', collection: 'reka', image: '/images/item6.png', name: { ru: 'Изгиб', en: 'Curve' }, price: '55000', size: '17.0', weight: '3.5г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: '3', category: 'bracelets', collection: 'reka', image: '/images/item7.png', name: { ru: 'Дельта', en: 'Delta' }, price: '53000', size: '18.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: '4', category: 'bracelets', collection: 'reka', image: '/images/item9.png', name: { ru: 'Ручей', en: 'Creek' }, price: '49000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: '5', category: 'bracelets', collection: 'reka', image: '/images/item12.png', name: { ru: 'Источник', en: 'Source' }, price: '58000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'bracelet-les-1', category: 'bracelets', collection: 'les', image: '/images/item8.png', name: { ru: 'Кора', en: 'Bark' }, price: '61000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'bracelet-les-2', category: 'bracelets', collection: 'les', image: '/images/item9.png', name: { ru: 'Ветвь', en: 'Branch' }, price: '59000', size: '17.0', weight: '3.5г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'bracelet-les-3', category: 'bracelets', collection: 'les', image: '/images/item2.png', name: { ru: 'Листва', en: 'Foliage' }, price: '63000', size: '18.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'bracelet-les-4', category: 'bracelets', collection: 'les', image: '/images/item4.png', name: { ru: 'Мох', en: 'Moss' }, price: '60000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'bracelet-les-5', category: 'bracelets', collection: 'les', image: '/images/item1.png', name: { ru: 'Тропа', en: 'Path' }, price: '58000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'bracelet-les-6', category: 'bracelets', collection: 'les', image: '/images/item6.png', name: { ru: 'Корень', en: 'Root' }, price: '65000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'bracelet-les-7', category: 'bracelets', collection: 'les', image: '/images/item7.png', name: { ru: 'Чаща', en: 'Thicket' }, price: '68000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },

    // === СЕРЬГИ (EARRINGS) ===
    { id: 'earring-veter-1', category: 'earrings', collection: 'veter', image: '/images/item1.png', name: { ru: 'Шепот', en: 'Whisper' }, price: '28000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'earring-veter-2', category: 'earrings', collection: 'veter', image: '/images/item2.png', name: { ru: 'Порыв', en: 'Gust' }, price: '31000', size: '17.0', weight: '3.5г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'earring-veter-3', category: 'earrings', collection: 'veter', image: '/images/item4.png', name: { ru: 'Бриз', en: 'Breeze' }, price: '29000', size: '18.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'earring-veter-4', category: 'earrings', collection: 'veter', image: '/images/item6.png', name: { ru: 'Вихрь', en: 'Vortex' }, price: '33000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'earring-veter-5', category: 'earrings', collection: 'veter', image: '/images/item7.png', name: { ru: 'Эфир', en: 'Aether' }, price: '27000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },

    // === ПОДВЕСКИ (PENDANTS) ===
    { id: 'pendant-king-1', category: 'pendants', collection: 'king', image: '/images/item10.png', name: { ru: 'Корона', en: 'Crown' }, price: '48000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'pendant-king-2', category: 'pendants', collection: 'king', image: '/images/item11.png', name: { ru: 'Скипетр', en: 'Scepter' }, price: '51000', size: '17.0', weight: '3.5г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'pendant-king-3', category: 'pendants', collection: 'king', image: '/images/item12.png', name: { ru: 'Трон', en: 'Throne' }, price: '55000', size: '18.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'pendant-king-4', category: 'pendants', collection: 'king', image: '/images/item9.png', name: { ru: 'Мантия', en: 'Mantle' }, price: '49000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'pendant-king-5', category: 'pendants', collection: 'king', image: '/images/item8.png', name: { ru: 'Держава', en: 'Orb' }, price: '53000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'pendant-king-6', category: 'pendants', collection: 'king', image: '/images/item3.png', name: { ru: 'Регалия', en: 'Regalia' }, price: '50000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },

    // === ОЖЕРЕЛЬЯ (NECKLACES) ===
    { id: 'necklace-taina-1', category: 'necklaces', collection: 'taina', image: '/images/item5.png', name: { ru: 'Загадка', en: 'Enigma' }, price: '75000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'necklace-taina-2', category: 'necklaces', collection: 'taina', image: '/images/item3.png', name: { ru: 'Секрет', en: 'Secret' }, price: '79000', size: '17.0', weight: '3.5г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'necklace-taina-3', category: 'necklaces', collection: 'taina', image: '/images/item8.png', name: { ru: 'Мистерия', en: 'Mystery' }, price: '82000', size: '18.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'necklace-taina-4', category: 'necklaces', collection: 'taina', image: '/images/item9.png', name: { ru: 'Шифр', en: 'Cipher' }, price: '77000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'necklace-taina-5', category: 'necklaces', collection: 'taina', image: '/images/item10.png', name: { ru: 'Иллюзия', en: 'Illusion' }, price: '85000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'necklace-taina-6', category: 'necklaces', collection: 'taina', image: '/images/item2.png', name: { ru: 'Грёза', en: 'Reverie' }, price: '81000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'necklace-taina-7', category: 'necklaces', collection: 'taina', image: '/images/item7.png', name: { ru: 'Оракул', en: 'Oracle' }, price: '88000', size: '17.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
    { id: 'necklace-taina-8', category: 'necklaces', collection: 'taina', image: '/images/item4.png', name: { ru: 'Пророчество', en: 'Prophecy' }, price: '92000', size: '18.0', weight: '2.9г', material: {ru: 'Серебро, гранат', en: 'Silver, emerald'} },
];

export const cardTypeSequence = [3, 2, 1, 2, 2, 3, 3, 2, 1, 1, 3, 1];

export const mobileSliderImages = [
    { url: '/images/mobRing.png', alt: { ru: 'Слайд 1', en: 'Slide 1' } },
    { url: '/images/parallax3.png', alt: { ru: 'Слайд 2', en: 'Slide 2' } },
    { url: '/images/parallax4.png', alt: { ru: 'Слайд 3', en: 'Slide 3' } },
];

export const mobileCatalogRandom = [
    { url: '/images/item7.png', alt: { ru: 'Слайд 1', en: 'Slide 1' } },
    { url: '/images/item8.png', alt: { ru: 'Слайд 2', en: 'Slide 2' } },
    { url: '/images/item3.png', alt: { ru: 'Слайд 3', en: 'Slide 3' } },
    { url: '/images/item4.png', alt: { ru: 'Слайд 4', en: 'Slide 4' } },
    { url: '/images/item5.png', alt: { ru: 'Слайд 5', en: 'Slide 5' } },
    { url: '/images/item6.png', alt: { ru: 'Слайд 6', en: 'Slide 6' } },
];

export async function getCatalogData(categorySlug, collectionSlug) {
    const categoryInfo = categoryPageData[categorySlug] || {
        title: { ru: 'Каталог', en: 'Catalog' },
        description: { ru: 'Все наши изделия.', en: 'All our products.' }
    };

    let collectionInfo = null;
    if (categorySlug && collectionSlug && collections[categorySlug]) {
        const foundCollection = collections[categorySlug].find(c => c.path.endsWith(`/${collectionSlug}`));
        if (foundCollection) {
            collectionInfo = { name: foundCollection.name };
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
        collectionInfo,
    };
}