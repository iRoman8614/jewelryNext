// // src/lib/products.data.js
//
// const allProducts = [
//     {
//         id: '1', // ID для meteor-ring
//         name: 'METEOR',
//         type: 'Кольцо',
//         price: '33 000 ₽',
//         description: 'Кольцо из стерлингового серебра 925 пробы с использованием техник чернения и полировки. Вдохновлено космическими телами, упавшими на Землю.',
//         materials: 'Серебро 925 пробы, гранат',
//         details: {
//             size: { label: 'РАЗМЕР', value: '16.8' },
//             weight: { label: 'ВЕС', value: '2.2 г' },
//             material: { label: 'МАТЕРИАЛЫ', value: 'ЧЕРНЕНОЕ СЕРЕБРО\nГРАНАТ' },
//             price: { label: 'ЦЕНА', value: '33K' }
//         },
//         images: [
//             '/images/met1.png',
//             '/images/met2.png',
//             '/images/met3.png',
//             '/images/met4.png',
//         ]
//     },
//     {
//         id: '2',
//         name: 'СТОУН ХАРТ',
//         type: 'Кольцо',
//         price: '41 000 ₽',
//         description: 'Массивное кольцо, символизирующее твердость духа и нерушимость принципов. Каждый экземпляр уникален в своей текстуре.',
//         materials: 'Серебро 925 пробы, топаз',
//         details: {
//             size: { label: 'РАЗМЕР', value: '17.5' },
//             weight: { label: 'ВЕС', value: '3.5 г' },
//             material: { label: 'МАТЕРИАЛЫ', value: 'МАТОВОЕ СЕРЕБРО\nГОЛУБОЙ ТОПАЗ' },
//             price: { label: 'ЦЕНА', value: '41K' }
//         },
//         images: [
//             '/images/met4.png',
//             '/images/met1.png',
//             '/images/met3.png',
//             '/images/met2.png',
//         ]
//     },
//     {
//         id: '3',
//         name: 'ТАТТЛЕРС ДРИМ',
//         type: 'Браслет',
//         price: '52 000 ₽',
//         description: 'Плавные линии этого браслета напоминают изгибы реки. Идеально подходит для тех, кто ценит природные мотивы и элегантность.',
//         materials: 'Серебро 925 пробы',
//         details: {
//             size: { label: 'ДЛИНА', value: '18 см' },
//             weight: { label: 'ВЕС', value: '12.1 г' },
//             material: { label: 'МАТЕРИАЛЫ', value: 'ПОЛИРОВАННОЕ СЕРЕБРО' },
//             price: { label: 'ЦЕНА', value: '52K' }
//         },
//         images: [
//             '/images/met3.png',
//             '/images/met1.png',
//         ]
//     },
//     {
//         id: '4',
//         name: 'ЛУННЫЙ СВЕТ',
//         type: 'Серьги',
//         price: '28 000 ₽',
//         description: 'Элегантные серьги, отражающие свет подобно лунной поверхности. Легкие и комфортные для ежедневного ношения.',
//         materials: 'Серебро 925 пробы, лунный камень',
//         details: {
//             size: { label: 'ДИАМЕТР', value: '1.5 см' },
//             weight: { label: 'ВЕС (ПАРА)', value: '4.8 г' },
//             material: { label: 'МАТЕРИАЛЫ', value: 'СЕРЕБРО\nЛУННЫЙ КАМЕНЬ' },
//             price: { label: 'ЦЕНА', value: '28K' }
//         },
//         images: [
//             '/images/met2.png',
//             '/images/met4.png',
//             '/images/met1.png',
//             '/images/met3.png',
//         ]
//     }
// ];
//
// export function getProductById(id) {
//     console.log(`Имитация запроса для товара с ID: ${id}`);
//     let product = allProducts.find(p => p.id === id);
//     return product;
// }
//
// export function getAllProducts() {
//     return allProducts;
// }

// src/lib/products.data.js

const allProducts = [
    {
        id: '1',
        name: { ru: 'МЕТЕОР', en: 'METEOR' },
        type: { ru: 'Кольцо', en: 'Ring' },
        collection: { ru: 'Коллекция "Заря"', en: 'Collection "Dawn"' },
        price: '33 000 ₽',
        description: {
            ru: 'Кольцо из стерлингового серебра 925 пробы с использованием техник чернения и полировки. Вдохновлено космическими телами, упавшими на Землю.',
            en: 'A ring made of 925 sterling silver using blackening and polishing techniques. Inspired by celestial bodies that have fallen to Earth.'
        },
        materials: {
            ru: 'Серебро 925 пробы, гранат',
            en: '925 Sterling Silver, Garnet'
        },
        details: {
            size: { label: { ru: 'РАЗМЕР', en: 'SIZE' }, value: '16.8' },
            weight: { label: { ru: 'ВЕС', en: 'WEIGHT' }, value: '2.2 г' },
            material: { label: { ru: 'МАТЕРИАЛЫ', en: 'MATERIALS' }, value: { ru: 'ЧЕРНЕНОЕ СЕРЕБРО\nГРАНАТ', en: 'OXIDIZED SILVER\nGARNET' } },
            price: { label: { ru: 'ЦЕНА', en: 'PRICE' }, value: '33K' }
        },
        images: [ '/images/met1.png', '/images/met2.png', '/images/met3.png' ]
    },
    {
        id: '2',
        name: { ru: 'СТОУН ХАРТ', en: 'STONE HEART' },
        type: { ru: 'Кольцо', en: 'Ring' },
        collection: { ru: 'Коллекция "Заря"', en: 'Collection "Dawn"' },
        price: '41 000 ₽',
        description: {
            ru: 'Массивное кольцо, символизирующее твердость духа и нерушимость принципов. Каждый экземпляр уникален в своей текстуре.',
            en: 'A massive ring symbolizing fortitude and the steadfastness of principles. Each piece is unique in its texture.'
        },
        materials: {
            ru: 'Серебро 925 пробы, топаз',
            en: '925 Sterling Silver, Topaz'
        },
        details: {
            size: { label: { ru: 'РАЗМЕР', en: 'SIZE' }, value: '17.5' },
            weight: { label: { ru: 'ВЕС', en: 'WEIGHT' }, value: '3.5 г' },
            material: { label: { ru: 'МАТЕРИАЛЫ', en: 'MATERIALS' }, value: { ru: 'МАТОВОЕ СЕРЕБРО\nГОЛУБОЙ ТОПАЗ', en: 'MATTE SILVER\nBLUE TOPAZ' } },
            price: { label: { ru: 'ЦЕНА', en: 'PRICE' }, value: '41K' }
        },
        images: [ '/images/products/stone-heart-1.png', '/images/products/stone-heart-2.png' ]
    },
    {
        id: '3',
        name: { ru: 'ТАТТЛЕРС ДРИМ', en: 'TATTLER\'S DREAM' },
        type: { ru: 'Браслет', en: 'Bracelet' },
        collection: { ru: 'Коллекция "Река"', en: 'Collection "River"' },
        price: '52 000 ₽',
        description: {
            ru: 'Плавные линии этого браслета напоминают изгибы реки. Идеально подходит для тех, кто ценит природные мотивы и элегантность.',
            en: 'The smooth lines of this bracelet resemble the curves of a river. Ideal for those who appreciate natural motifs and elegance.'
        },
        materials: {
            ru: 'Серебро 925 пробы',
            en: '925 Sterling Silver'
        },
        details: {
            size: { label: { ru: 'ДЛИНА', en: 'LENGTH' }, value: '18 см' },
            weight: { label: { ru: 'ВЕС', en: 'WEIGHT' }, value: '12.1 г' },
            material: { label: { ru: 'МАТЕРИАЛЫ', en: 'MATERIALS' }, value: { ru: 'ПОЛИРОВАННОЕ СЕРЕБРО', en: 'POLISHED SILVER' } },
            price: { label: { ru: 'ЦЕНА', en: 'PRICE' }, value: '52K' }
        },
        images: [ '/images/products/tattlers-dream-1.png', '/images/products/tattlers-dream-2.png' ]
    },
    {
        id: '4',
        name: { ru: 'ЛУННЫЙ СВЕТ', en: 'MOONLIGHT' },
        type: { ru: 'Серьги', en: 'Earrings' },
        collection: { ru: 'Коллекция "Ветер"', en: 'Collection "Wind"' },
        price: '28 000 ₽',
        description: {
            ru: 'Элегантные серьги, отражающие свет подобно лунной поверхности. Легкие и комфортные для ежедневного ношения.',
            en: 'Elegant earrings that reflect light like the surface of the moon. Lightweight and comfortable for everyday wear.'
        },
        materials: {
            ru: 'Серебро 925 пробы, лунный камень',
            en: '925 Sterling Silver, Moonstone'
        },
        details: {
            size: { label: { ru: 'ДИАМЕТР', en: 'DIAMETER' }, value: '1.5 см' },
            weight: { label: { ru: 'ВЕС (ПАРА)', en: 'WEIGHT (PAIR)' }, value: '4.8 г' },
            material: { label: { ru: 'МАТЕРИАЛЫ', en: 'MATERIALS' }, value: { ru: 'СЕРЕБРО\nЛУННЫЙ КАМЕНЬ', en: 'SILVER\nMOONSTONE' } },
            price: { label: { ru: 'ЦЕНА', en: 'PRICE' }, value: '28K' }
        },
        images: [ '/images/products/moonlight-1.png', '/images/products/moonlight-2.png' ]
    }
];

export function getProductById(id) {
    console.log(`Имитация запроса для товара с ID: ${id}`);
    const product = allProducts.find(p => p.id === id);
    return product;
}

export function getAllProducts() {
    return allProducts;
}