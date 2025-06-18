
export const categoryData = [
    { id: 'rings', name: 'Rings', slug: '/category/rings' },
    { id: 'bracelets', name: 'Bracelets', slug: '/category/bracelets' },
    { id: 'earrings', name: 'Earrings', slug: '/category/earrings' },
    { id: 'pendants', name: 'Pendants', slug: '/category/pendants' },
];

export const SNAKE_CONFIG = {
    NUMBER_OF_ELEMENTS: 6,
    INITIAL_POSITION_PATTERN: [2, 1, 2, 3, 2, 1],
    POSITION_SHIFT_PX: 20,
    BASE_WAVE_PATTERN: [1, 2, 3, 2],
};

export const snakeImages = [
    // Первые 6 для верхнего ряда
    { id: 's1', top: '/images/snake-top-1.png', bottom: '/images/snake-top-2.png' },
    { id: 's2', top: '/images/snake-top-2.png', bottom: '/images/snake-top-5.png' },
    { id: 's3', top: '/images/snake-top-3.png', bottom: '/images/snake-top-1.png' },
    { id: 's4', top: '/images/snake-top-4.png', bottom: '/images/snake-top-6.png' },
    { id: 's5', top: '/images/snake-top-5.png', bottom: '/images/snake-top-4.png' },
    { id: 's6', top: '/images/snake-top-6.png', bottom: '/images/snake-top-3.png' },
    // Следующие 6 для нижнего ряда (могут быть те же или другие)
    { id: 's7', top: '/images/snake-top-7.png', bottom: '/images/snake-top-10.png' },
    { id: 's8', top: '/images/snake-top-8.png', bottom: '/images/snake-top-11.png' },
    { id: 's9', top: '/images/snake-top-9.png', bottom: '/images/snake-top-7.png' },
    { id: 's10', top: '/images/snake-top-10.png', bottom: '/images/snake-top-12.png' },
    { id: 's11', top: '/images/snake-top-11.png', bottom: '/images/snake-top-8.png' },
    { id: 's12', top: '/images/snake-top-1.png', bottom: '/images/snake-top-9.png' },
];