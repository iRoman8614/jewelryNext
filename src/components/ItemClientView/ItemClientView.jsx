// src/components/ItemClientView/ItemClientView.jsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsClient } from '@/hooks/useIsClient';
import ProductView from '@/components/ProductView/ProductView';

export default function ItemClientView({ product, itemId }) {
    const isClient = useIsClient();
    const router = useRouter();

    useEffect(() => {
        if (!isClient) return;

        // Проверяем размер экрана на клиенте
        const checkDevice = () => {
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // Если пользователь на мобилке, редиректим на мобильную версию
                router.replace(`/category?item=${itemId}`);
            }
        };

        checkDevice();

        // Добавляем слушатель изменения размера окна
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, [isClient, router, itemId]);

    if (!isClient) {
        return <div>Загрузка...</div>;
    }

    // Рендерим ваш существующий компонент ProductView
    return <ProductView product={product} />;
}