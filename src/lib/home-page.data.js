// src/lib/home-page.data.js

// width и left для каждого блока раньше были жёстко зашиты здесь (подогнаны
// под макет из Figma). Теперь их отдаёт бэкенд (HomepageConfig в админке,
// поля вида image1_width/image1_left) — см. mergeLayoutWithContent в page.js,
// который накладывает их поверх этих объектов. top/zIndex/speed остаются
// здесь как раньше — их менять не просили.
export const paralaxSet1 = [
    { id: 0, type: 'text', content: '', top: '2%', zIndex: 10, speed: 1 },
    { id: 1, type: 'image', src: '', alt: '', top: '9%', zIndex: 1, speed: -10 },
    { id: 2, type: 'image', src: '', alt: '', top: '20%', zIndex: 3, speed: 5 },
    { id: 3, type: 'image', src: '', alt: '', top: '40%', zIndex: 2, speed: -5 },
    { id: 4, type: 'image', src: '', alt: '', top: '55%', zIndex: 4, speed: 20 },
    { id: 5, type: 'image', src: '', alt: '', top: '85%', zIndex: 5, speed: -8 },
    { id: 6, type: 'image', src: '', alt: '', top: '70%', zIndex: 1, speed: 8 },
];

export const paralaxSet2 = [
    {id: 7, type: 'text', top: '3%', zIndex: 10, speed: 2},
    {id: 8, type: 'image', src: '', alt: '', top: '14%', zIndex: 1, speed: -8},
    {id: 9, type: 'image', src: '', alt: '', top: '19%', zIndex: 3, speed: 5},
    {id: 10, type: 'image', src: '', alt: '', top: '26%', zIndex: 3, speed: -12},
    {id: 11, type: 'image', src: '', alt: '', top: '38%', zIndex: 2, speed: -4},
    {id: 12, type: 'image', src: '', alt: '', top: '50%', zIndex: 4, speed: -10},
    {id: 13, type: 'text', top: '55%', zIndex: 5, speed: 3},
    {id: 14, type: 'image', src: '', alt: '', top: '64%', zIndex: 6, speed: 10},
    {id: 15, type: 'image', src: '', alt: '', top: '72%', zIndex: 8, speed: -6},
    {id: 16, type: 'text', top: '83%', zIndex: 5, speed: 3},
    {id: 17, type: 'image', src: '', alt: '', top: '86%', zIndex: 7, speed: 7},
];

export const paralaxSet3 = [
    {id: 19, type: 'image', src: '', alt: '', top: '10%', zIndex: 1, speed: -8},
    {id: 20, type: 'image', src: '', alt: '', top: '25%', zIndex: 3, speed: 5},
    {id: 21, type: 'image', src: '', alt: '', top: '45%', zIndex: 2, speed: -4},
    {id: 22, type: 'image', src: '', alt: '', top: '60%', zIndex: 3, speed: 5},
    {id: 23, type: 'image', src: '', alt: '', top: '80%', zIndex: 2, speed: -4},
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
    text: `Мастерская: г. Москва, Малый Николопесковский 4 `,
    contacts: {
        email: 'service@27jwlr.store',
        social: '@27jwlr ',
        tg: '@hnp27',
        phone: '+79967779999'
    }
};