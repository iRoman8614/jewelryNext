// components/Providers.jsx

"use client";

import { ParallaxProvider } from 'react-scroll-parallax';
import { LanguageProvider } from '@/components/LanguageProvider/LanguageProvider';
import { CartProvider } from '@/components/CartProvider/CartProvider';

export function Providers({ children }) {
    return (
        <LanguageProvider>
            <CartProvider>
                <ParallaxProvider>
                    {children}
                </ParallaxProvider>
            </CartProvider>
        </LanguageProvider>
    );
}