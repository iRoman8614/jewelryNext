// src/lib/products.data.js

const allProducts = [
    {
        id: '1', // ID для meteor-ring
        name: 'METEOR',
        type: 'Кольцо',
        price: '33 000 ₽',
        description: 'Кольцо из стерлингового серебра 925 пробы с использованием техник чернения и полировки. Вдохновлено космическими телами, упавшими на Землю.',
        materials: 'Серебро 925 пробы, гранат',
        details: {
            size: { label: 'РАЗМЕР', value: '16.8' },
            weight: { label: 'ВЕС', value: '2.2 г' },
            material: { label: 'МАТЕРИАЛЫ', value: 'ЧЕРНЕНОЕ СЕРЕБРО\nГРАНАТ' },
            price: { label: 'ЦЕНА', value: '33K' }
        },
        images: [
            '/images/met1.png',
            '/images/met2.png',
            '/images/met3.png',
            '/images/met4.png',
        ]
    },
    {
        id: '2',
        name: 'СТОУН ХАРТ',
        type: 'Кольцо',
        price: '41 000 ₽',
        description: 'Массивное кольцо, символизирующее твердость духа и нерушимость принципов. Каждый экземпляр уникален в своей текстуре.',
        materials: 'Серебро 925 пробы, топаз',
        details: {
            size: { label: 'РАЗМЕР', value: '17.5' },
            weight: { label: 'ВЕС', value: '3.5 г' },
            material: { label: 'МАТЕРИАЛЫ', value: 'МАТОВОЕ СЕРЕБРО\nГОЛУБОЙ ТОПАЗ' },
            price: { label: 'ЦЕНА', value: '41K' }
        },
        images: [
            '/images/met4.png',
            '/images/met1.png',
            '/images/met3.png',
            '/images/met2.png',
        ]
    },
    {
        id: '3',
        name: 'ТАТТЛЕРС ДРИМ',
        type: 'Браслет',
        price: '52 000 ₽',
        description: 'Плавные линии этого браслета напоминают изгибы реки. Идеально подходит для тех, кто ценит природные мотивы и элегантность.',
        materials: 'Серебро 925 пробы',
        details: {
            size: { label: 'ДЛИНА', value: '18 см' },
            weight: { label: 'ВЕС', value: '12.1 г' },
            material: { label: 'МАТЕРИАЛЫ', value: 'ПОЛИРОВАННОЕ СЕРЕБРО' },
            price: { label: 'ЦЕНА', value: '52K' }
        },
        images: [
            '/images/met3.png',
            '/images/met1.png',
        ]
    },
    {
        id: '4',
        name: 'ЛУННЫЙ СВЕТ',
        type: 'Серьги',
        price: '28 000 ₽',
        description: 'Элегантные серьги, отражающие свет подобно лунной поверхности. Легкие и комфортные для ежедневного ношения.',
        materials: 'Серебро 925 пробы, лунный камень',
        details: {
            size: { label: 'ДИАМЕТР', value: '1.5 см' },
            weight: { label: 'ВЕС (ПАРА)', value: '4.8 г' },
            material: { label: 'МАТЕРИАЛЫ', value: 'СЕРЕБРО\nЛУННЫЙ КАМЕНЬ' },
            price: { label: 'ЦЕНА', value: '28K' }
        },
        images: [
            '/images/met2.png',
            '/images/met4.png',
            '/images/met1.png',
            '/images/met3.png',
        ]
    }
];

export function getProductById(id) {
    console.log(`Имитация запроса для товара с ID: ${id}`);
    let product = allProducts.find(p => p.id === id);
    return product;
}

export function getAllProducts() {
    return allProducts;
}