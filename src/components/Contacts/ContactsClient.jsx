'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Contacts.module.scss';
import { footerData } from '@/lib/home-page.data.js';
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';

// Превращает то, что владелец вставил в админку, в карту.
// Принимает: полный код «<iframe src="...">», готовую встраиваемую ссылку
// (Яндекс map-widget / Google output=embed) ИЛИ обычную ссылку из адресной
// строки Google/Яндекс Карт (из неё вытаскиваем координаты и собираем
// встраиваемый адрес сами — обычные /maps/place/... в iframe не открываются).
//
// Возвращает { embedSrc, rawLink }:
//   embedSrc — адрес для <iframe> (или '', если встроить нельзя);
//   rawLink  — исходная ссылка на карту, чтобы показать «Открыть на карте».
const resolveMap = (value) => {
    if (!value) return { embedSrc: '', rawLink: '' };
    const raw = String(value).trim();
    const m = raw.match(/src\s*=\s*["']([^"']+)["']/i);
    const src = (m ? m[1] : raw).trim();

    const isMapsLink = /^https?:\/\/[^\s"']*(yandex\.[a-z.]+\/(maps|map-widget)|google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(src);

    // 1) уже встраиваемые формы — используем как есть
    if (/yandex\.[a-z.]+\/map-widget/i.test(src)) return { embedSrc: src, rawLink: src };
    if (/google\.[a-z.]+\/maps\/embed/i.test(src)) return { embedSrc: src, rawLink: src };
    if (/[?&]output=embed/i.test(src)) return { embedSrc: src, rawLink: src };

    // 2) обычная ссылка Google: координаты в @lat,lng[,zoom] или !3dLAT!4dLNG или q=lat,lng
    let lat, lng, zoom;
    const at = src.match(/@(-?\d+\.\d+),(-?\d+\.\d+)(?:,(\d+(?:\.\d+)?)z)?/);
    if (at) { lat = at[1]; lng = at[2]; zoom = at[3]; }
    if (!lat) {
        const d = src.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
        if (d) { lat = d[1]; lng = d[2]; }
    }
    if (!lat) {
        const q = src.match(/[?&]q=(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
        if (q) { lat = q[1]; lng = q[2]; }
    }
    if (lat && lng && /google|maps\.google|goo\.gl/i.test(src)) {
        const z = zoom ? Math.round(parseFloat(zoom)) : 16;
        return {
            embedSrc: `https://maps.google.com/maps?q=${lat},${lng}&z=${z}&hl=ru&output=embed`,
            rawLink: src,
        };
    }

    // 3) обычная ссылка Яндекса с ll=lng,lat[&z=]
    const ll = src.match(/[?&]ll=(-?\d+\.\d+)(?:%2C|,)(-?\d+\.\d+)/i);
    if (ll && /yandex/i.test(src)) {
        const zm = src.match(/[?&]z=(\d+)/);
        return {
            embedSrc: `https://yandex.ru/map-widget/v1/?ll=${ll[1]}%2C${ll[2]}&z=${zm ? zm[1] : '16'}`,
            rawLink: src,
        };
    }

    // 4) встроить не вышло — отдаём только ссылку (если это вообще карта)
    return { embedSrc: '', rawLink: isMapsLink ? src : '' };
};

// name / address могут прийти строкой или объектом {ru,en} — поддерживаем оба.
const pick = (val, lang) => {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    return val[lang] || val.ru || val.en || '';
};

const InstagramIcon = () => (
    <svg className={styles.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd" />
    </svg>
);

const TelegramIcon = () => (
    <svg className={styles.icon} fill="currentColor" width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.122 10.040c0.006-0 0.014-0 0.022-0 0.209 0 0.403 0.065 0.562 0.177l-0.003-0.002c0.116 0.101 0.194 0.243 0.213 0.403l0 0.003c0.020 0.122 0.031 0.262 0.031 0.405 0 0.065-0.002 0.129-0.007 0.193l0-0.009c-0.225 2.369-1.201 8.114-1.697 10.766-0.21 1.123-0.623 1.499-1.023 1.535-0.869 0.081-1.529-0.574-2.371-1.126-1.318-0.865-2.063-1.403-3.342-2.246-1.479-0.973-0.52-1.51 0.322-2.384 0.221-0.23 4.052-3.715 4.127-4.031 0.004-0.019 0.006-0.040 0.006-0.062 0-0.078-0.029-0.149-0.076-0.203l0 0c-0.052-0.034-0.117-0.053-0.185-0.053-0.045 0-0.088 0.009-0.128 0.024l0.002-0.001q-0.198 0.045-6.316 4.174c-0.445 0.351-1.007 0.573-1.619 0.599l-0.006 0c-0.867-0.105-1.654-0.298-2.401-0.573l0.074 0.024c-0.938-0.306-1.683-0.467-1.619-0.985q0.051-0.404 1.114-0.827 6.548-2.853 8.733-3.761c1.607-0.853 3.47-1.555 5.429-2.010l0.157-0.031z" />
    </svg>
);

const WhatsappIcon = () => (
    <svg className={styles.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clipRule="evenodd" />
        <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z" />
    </svg>
);

export default function ContactsClient({ salesPoints = [] }) {
    const { lang } = useLanguage();
    const ru = lang === 'ru';

    const workshop = ru
        ? 'Мастерская: г. Москва, Звездный бульвар 21с3'
        : 'Workshop: Moscow, Zvezdny Boulevard 21c3';

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>{ru ? 'Контакты' : 'Contacts'}</h1>

            <Image
                className={styles.logo}
                src="/images/logo.png"
                alt="27 JWLR"
                width={70}
                height={70}
                priority
            />

            <p className={styles.workshop}>{workshop}</p>

            <div className={styles.contacts}>
                <a className={styles.contactRow} href={`mailto:${footerData.contacts.email}`}>
                    <span className={styles.contactLabel}>e-mail</span>
                    <span className={styles.contactValue}>{footerData.contacts.email}</span>
                </a>
                <div className={styles.contactRow}>
                    <InstagramIcon />
                    <span className={styles.contactValue}>{footerData.contacts.social}</span>
                </div>
                <div className={styles.contactRow}>
                    <TelegramIcon />
                    <span className={styles.contactValue}>{footerData.contacts.tg}</span>
                </div>
                <div className={styles.contactRow}>
                    <WhatsappIcon />
                    <span className={styles.contactValue}>{footerData.contacts.phone}</span>
                </div>
            </div>

            {ru && (
                <Link href="/policy" className={styles.offerta}>
                    Публичная офферта
                </Link>
            )}

            <section className={styles.pointsSection}>
                <h2 className={styles.subtitle}>{ru ? 'Где нас найти' : 'Where to find us'}</h2>

                {salesPoints.length === 0 ? (
                    <p className={styles.empty}>
                        {ru
                            ? 'Точки продаж скоро появятся.'
                            : 'Points of sale will appear here soon.'}
                    </p>
                ) : (
                    <div className={styles.points}>
                        {salesPoints.map((point) => {
                            const name = pick(point.name, lang);
                            const address = pick(point.address, lang);
                            const { embedSrc: mapSrc, rawLink: mapLink } = resolveMap(point.mapEmbedUrl || point.mapEmbed || point.map);
                            const website = point.websiteUrl || point.website || '';

                            return (
                                <article key={point.id ?? name} className={styles.card}>
                                    <div className={styles.cardHead}>
                                        {point.logoUrl && (
                                            // обычный <img>: логотип может быть с внешнего домена,
                                            // next/image потребовал бы их whitelisting в конфиге.
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img className={styles.cardLogo} src={point.logoUrl} alt={name} loading="lazy" />
                                        )}
                                        {name && <h3 className={styles.cardName}>{name}</h3>}
                                    </div>

                                    {address && <p className={styles.cardAddr}>{address}</p>}

                                    {website && (
                                        <a
                                            className={styles.cardLink}
                                            href={website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {ru ? 'Перейти на сайт' : 'Visit website'}
                                        </a>
                                    )}

                                    {mapSrc ? (
                                        <div className={styles.map}>
                                            <iframe
                                                src={mapSrc}
                                                title={name || 'map'}
                                                loading="lazy"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : mapLink ? (
                                        <a
                                            className={styles.cardLink}
                                            href={mapLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {ru ? 'Открыть на карте' : 'Open in maps'}
                                        </a>
                                    ) : null}
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}