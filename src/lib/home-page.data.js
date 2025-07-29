// src/lib/home-page.data.js

export const paralaxSet1 = [
    { id: 0, type: 'text', content: '', top: '2%', left: '5%', width: '65%', zIndex: 10, speed: 1 },
    { id: 1, type: 'image', src: '', alt: '', top: '9%', left: '65%', width: '27%', zIndex: 1, speed: -10 },
    { id: 2, type: 'image', src: '', alt: '', top: '20%', left: '15%', width: '25%', zIndex: 3, speed: 5 },
    { id: 3, type: 'image', src: '', alt: '', top: '40%', left: '55%', width: '29%', zIndex: 2, speed: -5 },
    { id: 4, type: 'image', src: '', alt: '', top: '55%', left: '7%', width: '38%', zIndex: 4, speed: 20 },
    { id: 5, type: 'image', src: '', alt: '', top: '85%', left: '5%', width: '31%', zIndex: 5, speed: -8 },
    { id: 6, type: 'image', src: '', alt: '', top: '70%', left: '60%', width: '28%', zIndex: 1, speed: 8 },
];

export const paralaxSet2 = [
    {id: 7, type: 'text', top: '3%', left: '10%', width: '80%', zIndex: 10, speed: 2},
    {id: 8, type: 'image', src: '', alt: '', top: '14%', left: '16%', width: '31%', zIndex: 1, speed: -8},
    {id: 9, type: 'image', src: '', alt: '', top: '19%', left: '65%', width: '23%', zIndex: 3, speed: 5},
    {id: 10, type: 'image', src: '', alt: '', top: '26%', left: '10%', width: '35%', zIndex: 3, speed: -12},
    {id: 11, type: 'image', src: '', alt: '', top: '38%', left: '60%', width: '23%', zIndex: 2, speed: -4},
    {id: 12, type: 'image', src: '', alt: '', top: '50%', left: '12%', width: '25%', zIndex: 4, speed: -10},
    {id: 13, type: 'text', top: '55%', left: '50%', width: '45%', zIndex: 5, speed: 3},
    {id: 14, type: 'image', src: '', alt: '', top: '64%', left: '60%', width: '24%', zIndex: 6, speed: 10},
    {id: 15, type: 'image', src: '', alt: '', top: '72%', left: '20%', width: '24%', zIndex: 8, speed: -6},
    {id: 16, type: 'text', top: '83%', left: '15%', width: '70%', zIndex: 5, speed: 3},
    {id: 17, type: 'image', src: '', alt: '', top: '86%', left: '48%', width: '27%', zIndex: 7, speed: 7},
];

export const paralaxSet3 = [
    {id: 19, type: 'image', src: '', alt: '', top: '10%', left: '56%', width: '32%', zIndex: 1, speed: -8},
    {id: 20, type: 'image', src: '', alt: '', top: '25%', left: '8%', width: '36%', zIndex: 3, speed: 5},
    {id: 21, type: 'image', src: '', alt: '', top: '45%', left: '51%', width: '33%', zIndex: 2, speed: -4},
    {id: 22, type: 'image', src: '', alt: '', top: '60%', left: '11%', width: '31%', zIndex: 3, speed: 5},
    {id: 23, type: 'image', src: '', alt: '', top: '80%', left: '55%', width: '37%', zIndex: 2, speed: -4},
];

export const custom = [
    {id: 1, type: 'text', title: {en: 'Custom', ru: "Кастом"}, content: {ru: "Хотите украшение, которое будет только вашим?\n" +
                "Мы воплотим самую смелую идею в драгоценном металле.\n" +
                "Желанный результат = наше мастерство и видение + ваша фантазия. Или же мечта..\n" +
                "Вместе с вами пройдемся по следующим этапам:\n" +
                " ⁃ Разработка эскиза\n" +
                " ⁃ Выбор материалов: определимся с металлом, поможем найти ваш уникальный камень среди уже наработанной базы коллекционеров, огранщиков и гемологов со всего мира.\n" +
                " ⁃ Воплощение в металле.", en: "Want a piece of jewelry that will be yours alone?\n" +
                "We will realize the boldest idea in precious metal.\n" +
                "The desired result = our craftsmanship and vision + your imagination. Or a dream.\n" +
                "We will walk through the following steps together with you:\n" +
                "⁃ Sketch development\n" +
                "⁃ Selection of materials: we will decide on the metal, help you find your unique stone among the already established base of collectors, cutters and gemologists from all over the world.\n" +
                "⁃ Incarnation in metal."}, top: '5%', left: '10%', width: '60%', zIndex: 5, speed: 3},
    {id: 2, type: 'image', src: '/images/parallax18.png', alt: '', top: '26%', left: '70%', width: '15%', zIndex: 100, speed: 10},
    {id: 3, type: 'text', content: {en: 'WE ENVISION', ru: "ПРЕДСТАВЛЕНИЕ "}, top: '41%', left: '52%', width: '20%', zIndex: 100, speed: 2},
    {id: 4, type: 'image', src: '/images/parallax19.png', alt: '', top: '32%', left: '5%', width: '20%', zIndex: 100, speed: -6},
    {id: 5, type: 'text', content: {en: 'FORM', ru: "ФОРМА"}, top: '49%', left: '28%', width: '20%', zIndex: 10, speed: -6},
    {id: 6, type: 'image', src: '/images/parallax20.png', alt: '', top: '58%', left: '60%', width: '30%', zIndex: 7, speed: 7},
    {id: 7, type: 'text', content: {en: 'AND CREATE', ru: "И СОЗДАНИЕ"}, top: '65%', left: '36%', width: '20%', zIndex: 10, speed: 2},
]

export const footerData = {
    logo: '/images/logotipe.png',
    text: `Мастерская: г. Москва, Звездный бульвар 21с3`,
    contacts: {
        email: '27jwlr@service.com',
        social: '@27jwlr ',
        tg: '@hnp27',
        phone: '+79967779999'
    }
};