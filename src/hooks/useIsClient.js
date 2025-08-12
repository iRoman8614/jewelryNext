// src/hooks/useIsClient.js
import { useState, useEffect } from 'react';

// Этот хук просто возвращает true, когда компонент загрузился в браузере, и false на сервере.
export function useIsClient() {
    const [isClient, setIsClient] = useState(false);

    // useEffect запускается только в браузере, после первого рендера
    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient;
}