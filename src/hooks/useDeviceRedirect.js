// src/hooks/useDeviceRedirect.js
"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useDeviceRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const isMobile = window.innerWidth <= 768;
        const currentPath = window.location.pathname;

        // Если мы на мобилке и находимся на desktop-пути товара
        if (isMobile && currentPath.startsWith('/item/')) {
            const itemId = currentPath.split('/item/')[1];
            if (itemId) {
                router.replace(`/category?item=${itemId}`);
                return;
            }
        }

        // Если мы на десктопе и находимся на мобильном пути товара
        if (!isMobile && currentPath === '/category' && searchParams.get('item')) {
            const itemId = searchParams.get('item');
            if (itemId) {
                router.replace(`/item/${itemId}`);
                return;
            }
        }

        // Мобильная версия теперь тоже открывает /category/{slug} (фильтр по
        // категории, как на десктопе) — редиректа на общий /category больше нет.

    }, [router, searchParams]);
}