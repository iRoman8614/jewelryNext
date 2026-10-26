"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './PaymentResult.module.scss';
import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const POLL_MS = 3000;
const POLL_LIMIT_MS = 3 * 60 * 1000;

const TEXT = {
    ru: {
        title: 'ОПЛАТА ЗАКАЗА',
        order: (id) => `ЗАКАЗ №${id}`,
        loading: 'Проверяем статус оплаты…',
        pending: 'Ожидаем подтверждение оплаты. Обычно это занимает несколько секунд — страница обновится сама.',
        pendingLong: 'Подтверждение задерживается. Если деньги списались, заказ отметится оплаченным автоматически — письмо придёт на почту. Можно обновить страницу позже.',
        backToPay: 'ВЕРНУТЬСЯ К ОПЛАТЕ',
        succeeded: 'Оплата прошла успешно. Подтверждение заказа и кассовый чек отправлены на вашу почту. Менеджер свяжется с вами для уточнения деталей.',
        canceled: 'Оплата не прошла или была отменена. Деньги не списаны.',
        unpaid: 'Заказ создан и ожидает оплаты.',
        pay: 'ОПЛАТИТЬ',
        reserved: (t) => `Изделия зарезервированы за вами до ${t}.`,
        retry: 'ОПЛАТИТЬ СНОВА',
        retrying: 'ПЕРЕХОД К ОПЛАТЕ…',
        retryFail: 'Не удалось перейти к оплате. Попробуйте ещё раз через минуту.',
        expired: 'Время на оплату истекло, заказ отменён. Изделия снова доступны — вы можете оформить новый заказ.',
        cancelled: 'Заказ отменён.',
        refunded: 'Оплата по заказу возвращена.',
        notFound: 'Заказ не найден. Проверьте ссылку или свяжитесь с нами.',
        toCatalog: 'В КАТАЛОГ',
        total: 'СУММА',
    },
    en: {
        title: 'ORDER PAYMENT',
        order: (id) => `ORDER №${id}`,
        loading: 'Checking payment status…',
        pending: 'Waiting for payment confirmation. It usually takes a few seconds — this page will update automatically.',
        pendingLong: 'Confirmation is taking longer than usual. If you were charged, the order will be marked as paid automatically and you will receive an email. You can refresh this page later.',
        backToPay: 'BACK TO PAYMENT',
        succeeded: 'Payment successful. The order confirmation and the fiscal receipt have been sent to your email. A manager will contact you to confirm the details.',
        canceled: 'The payment failed or was cancelled. You have not been charged.',
        unpaid: 'Your order has been created and is awaiting payment.',
        pay: 'PAY',
        reserved: (t) => `The items are reserved for you until ${t}.`,
        retry: 'PAY AGAIN',
        retrying: 'REDIRECTING…',
        retryFail: 'Could not open the payment page. Please try again in a minute.',
        expired: 'The payment time has expired and the order has been cancelled. The items are available again — you can place a new order.',
        cancelled: 'The order has been cancelled.',
        refunded: 'The payment for this order has been refunded.',
        notFound: 'Order not found. Please check the link or contact us.',
        toCatalog: 'TO CATALOG',
        total: 'TOTAL',
    },
};

const formatMoney = (v) => {
    const n = Number(v) || 0;
    const frac = Math.round(n * 100) % 100 !== 0 ? 2 : 0; // 8 900 ₽ / 8 900,50 ₽
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency', currency: 'RUB', minimumFractionDigits: frac, maximumFractionDigits: frac,
    }).format(n);
};

export default function PaymentResultClient() {
    const { lang } = useLanguage();
    const t = TEXT[lang === 'en' ? 'en' : 'ru'];
    const params = useSearchParams();
    const orderId = params.get('order');
    const token = params.get('token');

    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [waitingLong, setWaitingLong] = useState(false);
    const [retrying, setRetrying] = useState(false);
    const [retryError, setRetryError] = useState(null);
    const startedAt = useRef(Date.now());
    const retryLock = useRef(false);

    const load = useCallback(async () => {
        if (!orderId || !token) { setError('notFound'); return null; }
        try {
            const res = await fetch(`${API}/api/payments/orders/${encodeURIComponent(orderId)}?token=${encodeURIComponent(token)}`, { cache: 'no-store' });
            if (res.status === 404) { setError('notFound'); return null; }
            if (!res.ok) return null; // временная ошибка — попробуем на следующем тике
            const data = await res.json();
            setStatus(data);
            return data;
        } catch {
            return null;
        }
    }, [orderId, token]);

    // Опрос, пока оплата «в процессе».
    useEffect(() => {
        let timer = null;
        let stopped = false;
        const tick = async () => {
            const data = await load();
            if (stopped) return;
            const pending = !data || data.state === 'pending';
            if (pending && Date.now() - startedAt.current < POLL_LIMIT_MS) {
                timer = setTimeout(tick, POLL_MS);
            } else if (pending) {
                setWaitingLong(true);
            }
        };
        tick();
        return () => { stopped = true; if (timer) clearTimeout(timer); };
    }, [load]);

    const payAgain = async () => {
        if (retryLock.current) return; // защита от двойного клика
        retryLock.current = true;
        setRetrying(true);
        setRetryError(null);
        try {
            const res = await fetch(`${API}/api/payments/orders/${encodeURIComponent(orderId)}/pay?token=${encodeURIComponent(token)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: '{}',
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data.confirmationUrl) {
                window.location.assign(data.confirmationUrl);
                return; // остаёмся в состоянии «переход»
            }
            if (data?.state) setStatus(data);
            setRetryError(t.retryFail);
        } catch {
            setRetryError(t.retryFail);
        }
        retryLock.current = false;
        setRetrying(false);
    };

    const reservedUntil = status?.paymentExpiresAt
        ? new Date(status.paymentExpiresAt).toLocaleTimeString(lang === 'en' ? 'en-GB' : 'ru-RU', { hour: '2-digit', minute: '2-digit' })
        : null;

    let body;
    if (error === 'notFound') {
        body = <p className={styles.text}>{t.notFound}</p>;
    } else if (!status) {
        body = <p className={styles.text}>{t.loading}</p>;
    } else if (status.state === 'succeeded') {
        body = <p className={`${styles.text} ${styles.success}`}>{t.succeeded}</p>;
    } else if (status.state === 'pending') {
        body = (
            <>
                <div className={styles.spinner} aria-hidden="true" />
                <p className={styles.text}>{waitingLong ? t.pendingLong : t.pending}</p>
                {status.confirmationUrl && (
                    <a className={styles.button} href={status.confirmationUrl}>{t.backToPay}</a>
                )}
            </>
        );
    } else if (status.state === 'canceled' || status.state === 'unpaid') {
        body = (
            <>
                <p className={styles.text}>{status.state === 'unpaid' ? t.unpaid : t.canceled}</p>
                {reservedUntil && <p className={styles.note}>{t.reserved(reservedUntil)}</p>}
                {status.canRetry && (
                    <button type="button" className={styles.button} onClick={payAgain} disabled={retrying}>
                        {retrying ? t.retrying : (status.state === 'unpaid' ? t.pay : t.retry)}
                    </button>
                )}
                {retryError && <p className={styles.error}>{retryError}</p>}
            </>
        );
    } else if (status.state === 'expired') {
        body = <p className={styles.text}>{t.expired}</p>;
    } else if (status.state === 'refunded') {
        body = <p className={styles.text}>{t.refunded}</p>;
    } else {
        body = <p className={styles.text}>{t.cancelled}</p>;
    }

    const showCatalog = error === 'notFound' || ['succeeded', 'expired', 'cancelled', 'refunded'].includes(status?.state);

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>{t.title}</h1>
            {status?.orderId && (
                <div className={styles.orderRow}>
                    <span>{t.order(status.orderId)}</span>
                    <span><span className={styles.muted}>{t.total}</span> {formatMoney(status.amount)}</span>
                </div>
            )}
            <div className={styles.body}>{body}</div>
            {showCatalog && <Link href="/category" className={styles.link}>{t.toCatalog}</Link>}
        </div>
    );
}
