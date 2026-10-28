"use client";

// Плавающая кнопка корзины слева (пара к кнопке «наверх» справа).
// Красный кружок с количеством — когда в корзине есть товары.
// Не показывается на самой корзине и на странице оплаты.

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './CartFloatingButton.module.scss';
import { useCart } from '@/components/CartProvider/CartProvider';
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';

const HIDDEN_ON = ['/cart', '/payment'];

export default function CartFloatingButton() {
    const pathname = usePathname() || '';
    const { cartItems = [] } = useCart() || {};
    const { lang } = useLanguage();

    if (HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

    const count = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    const label = lang === 'en' ? 'Cart' : 'Корзина';

    return (
        <Link
            href="/cart"
            className={styles.button}
            aria-label={count > 0 ? `${label}: ${count}` : label}
        >
            <Image src="/images/basket.svg" alt="" width={32} height={32} className={styles.icon} />
            {count > 0 && (
                <span className={styles.badge} aria-hidden="true">{count > 99 ? '99+' : count}</span>
            )}
        </Link>
    );
}
