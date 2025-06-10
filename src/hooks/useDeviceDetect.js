// src/hooks/useDeviceDetect.js
import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768; // Задайте вашу точку перелома для мобильных устройств

export function useDeviceDetect() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDeviceType = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        checkDeviceType(); // Первоначальная проверка
        window.addEventListener('resize', checkDeviceType);

        return () => {
            window.removeEventListener('resize', checkDeviceType);
        };
    }, []);

    return { isMobile };
}