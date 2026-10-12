// src/lib/sizes.js
// Фиксированная сетка размеров колец 15..23 шаг 0.5 (копия back/src/config/sizes.js).

export const RING_SIZES = (() => {
    const list = [];
    for (let v = 15; v <= 23 + 1e-9; v += 0.5) list.push(String(Number(v.toFixed(1))));
    return list;
})();

// Товар размерный, если sizes — непустой объект.
export const hasSizes = (sizes) =>
    !!sizes && typeof sizes === 'object' && Object.keys(sizes).length > 0;

// Размеры, доступные к покупке (остаток > 0), в порядке сетки.
export const availableSizes = (sizes) => {
    if (!hasSizes(sizes)) return [];
    return RING_SIZES.filter((s) => s in sizes && Number(sizes[s]) > 0);
};

// Все заданные у товара размеры (включая с нулевым остатком), в порядке сетки.
export const definedSizes = (sizes) => {
    if (!hasSizes(sizes)) return [];
    return RING_SIZES.filter((s) => s in sizes);
};

export default RING_SIZES;