"use client";

// Прелоадер сайта: при ПЕРВОМ открытии за день (на любой странице) закрывает
// экран, пока грузятся картинки, с настоящим прогрессом. Дата показа хранится
// в localStorage (PRELOADER_KEY). В тот же день — сразу контент.
//
// Без мигания: скрипт PRELOADER_HEAD_SCRIPT (в <head>, см. layout.js) ДО
// отрисовки ставит <html class="jw-preloaded">, если сегодня уже показывали,
// и CSS прячет прелоадер. Иначе он виден с первого кадра (из SSR-разметки).

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './SitePreloader.module.scss';

export const PRELOADER_KEY = 'jwPreloadedOn';
const MIN_SHOW_MS = 800;     // чтобы не мелькал на быстром интернете
const MAX_SHOW_MS = 12000;   // страховка: не держать дольше
const FADE_MS = 600;

// Локальная дата YYYY-M-D — «один раз в день» по часам пользователя.
const todayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

// Встраивается в <head> строкой. Нет localStorage (приватный режим и т.п.) —
// прелоадер не показываем вовсе.
export const PRELOADER_HEAD_SCRIPT = `try{var d=new Date(),k=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();if(localStorage.getItem('${PRELOADER_KEY}')===k)document.documentElement.classList.add('jw-preloaded')}catch(e){document.documentElement.classList.add('jw-preloaded')}`;

export default function SitePreloader() {
    const [phase, setPhase] = useState('active'); // active | hiding | done
    const [progress, setProgress] = useState(4);

    useEffect(() => {
        if (document.documentElement.classList.contains('jw-preloaded')) {
            setPhase('done');
            return undefined;
        }
        const started = Date.now();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Картинки, которые грузятся сразу (lazy — те, что ниже экрана, не ждём).
        const images = Array.from(document.images).filter((img) => img.loading !== 'lazy');
        const total = images.length || 1;
        const update = () => {
            const done = images.filter((img) => img.complete).length;
            setProgress((p) => Math.max(p, Math.round((done / total) * 92)));
        };
        images.forEach((img) => {
            if (!img.complete) {
                img.addEventListener('load', update, { once: true });
                img.addEventListener('error', update, { once: true });
            }
        });
        update();

        let finished = false;
        let fadeTimer = null;
        let doneTimer = null;
        const finish = () => {
            if (finished) return;
            finished = true;
            setProgress(100);
            const wait = Math.max(0, MIN_SHOW_MS - (Date.now() - started));
            fadeTimer = setTimeout(() => {
                setPhase('hiding');
                try { localStorage.setItem(PRELOADER_KEY, todayKey()); } catch { /* ignore */ }
                document.body.style.overflow = prevOverflow;
                doneTimer = setTimeout(() => setPhase('done'), FADE_MS);
            }, wait);
        };

        if (document.readyState === 'complete') finish();
        else window.addEventListener('load', finish, { once: true });
        const maxTimer = setTimeout(finish, MAX_SHOW_MS);

        return () => {
            window.removeEventListener('load', finish);
            clearTimeout(maxTimer);
            clearTimeout(fadeTimer);
            clearTimeout(doneTimer);
            document.body.style.overflow = prevOverflow;
        };
    }, []);

    if (phase === 'done') return null;

    return (
        <div
            className={`${styles.root} ${phase === 'hiding' ? styles.hiding : ''}`}
            role="progressbar"
            aria-label="Загрузка"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
        >
            <Image src="/images/logotype.svg" alt="27 JWLR" width={108} height={123} priority className={styles.logo} />
            <div className={styles.bar}>
                <div className={styles.fill} style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}
