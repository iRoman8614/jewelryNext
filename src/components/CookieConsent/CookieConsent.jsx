"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import styles from './CookieConsent.module.scss';

const STORAGE_KEY = 'cookieConsent';

export default function CookieConsent() {
    const { lang } = useLanguage();
    // Не рендерим на сервере/до монтирования, чтобы избежать hydration-mismatch
    // и мигания плашки у тех, кто уже согласился.
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const accepted = localStorage.getItem(STORAGE_KEY);
            if (!accepted) setVisible(true);
        } catch (e) {
            // localStorage недоступен (приватный режим и т.п.) — показываем плашку.
            setVisible(true);
        }
    }, []);

    const accept = () => {
        try {
            localStorage.setItem(STORAGE_KEY, 'accepted');
        } catch (e) { /* ignore */ }
        setVisible(false);
    };

    if (!visible) return null;

    const t = lang === 'ru' ? {
        text: 'Мы используем файлы cookie для корректной работы сайта и улучшения сервиса. Продолжая пользоваться сайтом, вы соглашаетесь на использование cookie.',
        link: 'Политика конфиденциальности',
        accept: 'Принять',
    } : {
        text: 'We use cookies to make the site work properly and to improve our service. By continuing to use the site, you agree to the use of cookies.',
        link: 'Privacy policy',
        accept: 'Accept',
    };

    return (
        <div className={styles.banner} role="dialog" aria-live="polite" aria-label="cookie">
            <p className={styles.text}>
                {t.text}{' '}
                <Link href="/policy" className={styles.link}>{t.link}</Link>
            </p>
            <button type="button" className={styles.button} onClick={accept}>
                {t.accept}
            </button>
        </div>
    );
}