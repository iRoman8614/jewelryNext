"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

// Маска телефона: +7 (XXX) XXX-XX-XX. Принимает любой ввод, оставляет цифры,
// нормализует ведущую 8→7, добивает до российского формата.
const formatPhone = (raw) => {
    let d = (raw || '').replace(/\D/g, '');
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (d && !d.startsWith('7')) d = '7' + d;
    d = d.slice(0, 11);
    if (!d) return '';
    const p = d.slice(1); // до 10 цифр после кода
    let out = '+7';
    if (p.length > 0) out += ' (' + p.slice(0, 3);
    if (p.length >= 3) out += ')';
    if (p.length > 3) out += ' ' + p.slice(3, 6);
    if (p.length > 6) out += '-' + p.slice(6, 8);
    if (p.length > 8) out += '-' + p.slice(8, 10);
    return out;
};
import { useForm } from 'react-hook-form';
import styles from './ConfirmForm.module.scss';
import FormListItem from "@/components/FormListItem/FormListItem";
import { useLanguage } from "@/components/LanguageProvider/LanguageProvider";
import { useCart } from "@/components/CartProvider/CartProvider";

const PAY_ON_DELIVERY_VALUES = ['pickup', 'pick up'];

export default function ConfirmForm({ checkoutOptions, action, cartItems = [] }) {
    const { lang } = useLanguage();
    const { clearCart } = useCart();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({ mode: "onBlur" });
    const [isHovered, setIsHovered] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    // Тост-уведомление (успех/ошибка) вместо alert. Рендерится порталом в body,
    // поэтому переживает закрытие формы. Автоскрытие через 4 сек.
    const [toast, setToast] = useState(null);
    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 4000);
    };

    // Все строки формы в одном словаре — переключаются по языку (ru/en).
    const t = lang === 'ru' ? {
        closeForm: 'Закрыть форму', logo: 'Логотип', noItems: 'Товаров нет', total: 'ИТОГО',
        fullName: 'ФИО', email: 'ПОЧТА', phone: 'ТЕЛЕФОН', address: 'АДРЕС',
        delivery: 'ДОСТАВКА', comments: 'КОММЕНТАРИИ', payment: 'СПОСОБ ОПЛАТЫ',
        free: 'Бесплатно', pay: 'ОПЛАТИТЬ', submitting: 'ОТПРАВКА...',
        reqName: 'ФИО обязательно для заполнения',
        reqEmail: 'Почта обязательна для заполнения', badEmail: 'Неверный формат email адреса',
        reqPhone: 'Телефон обязателен для заполнения', badPhone: 'Неверный формат телефона',
        reqAddress: 'Адрес обязателен для заполнения',
        reqDelivery: 'Выберите способ доставки', reqPayment: 'Выберите способ оплаты',
        success: 'Заказ успешно оформлен!', serverError: 'Ошибка сервера',
        sendFail: 'Не удалось отправить заказ.',
        consentPD: 'Я даю согласие на обработку моих персональных данных',
        consentPolicyPre: 'Я ознакомлен(а) и согласен(на) с ',
        consentPolicyLink: 'политикой конфиденциальности',
        consentRequired: 'Для оформления заказа необходимо отметить оба согласия',
    } : {
        closeForm: 'Close form', logo: 'Logo', noItems: 'No items', total: 'TOTAL',
        fullName: 'FULL NAME', email: 'EMAIL', phone: 'PHONE', address: 'ADDRESS',
        delivery: 'DELIVERY', comments: 'COMMENTS', payment: 'PAYMENT METHOD',
        free: 'free', pay: 'PAY', submitting: 'SUBMITTING...',
        reqName: 'Full name is required',
        reqEmail: 'Email is required', badEmail: 'Invalid email format',
        reqPhone: 'Phone is required', badPhone: 'Invalid phone format',
        reqAddress: 'Address is required',
        reqDelivery: 'Select a delivery method', reqPayment: 'Select a payment method',
        success: 'Order placed successfully!', serverError: 'Server error',
        sendFail: 'Failed to submit the order.',
        consentPD: 'I consent to the processing of my personal data',
        consentPolicyPre: 'I have read and agree to the ',
        consentPolicyLink: 'privacy policy',
        consentRequired: 'Both consents are required to place an order',
    };

    const selectedDeliveryValue = watch('deliveryMethod');

    // Оба согласия обязательны для отправки (152-ФЗ / РКН): кнопка блокируется,
    // пока пользователь сам не отметит обе галочки (по умолчанию — false).
    const personalDataConsent = watch('personalDataConsent');
    const policyConsent = watch('policyConsent');
    const consentsGiven = Boolean(personalDataConsent) && Boolean(policyConsent);

    const allDeliveryOptions = checkoutOptions?.deliveryOptions?.[lang] || [];
    const allPaymentOptions = checkoutOptions?.paymentMethods?.[lang] || [];

    const productsTotal = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    const selectedDeliveryOption = allDeliveryOptions.find(
        option => option.value === selectedDeliveryValue
    );

    const deliveryPrice = parseFloat(selectedDeliveryOption?.price || '0');
    const finalTotalAmount = productsTotal + deliveryPrice;

    const formattedFinalAmount = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(finalTotalAmount);

    const visiblePaymentOptions = selectedDeliveryOption?.allowsPaymentOnDelivery === false
        ? allPaymentOptions.filter(option => !PAY_ON_DELIVERY_VALUES.includes(option.value))
        : allPaymentOptions;

    useEffect(() => {
        const selectedPaymentValue = watch('paymentMethod');
        const isStillVisible = visiblePaymentOptions.some(option => option.value === selectedPaymentValue);

        if (selectedPaymentValue && !isStillVisible) {
            setValue('paymentMethod', null);
        }
    }, [selectedDeliveryValue, visiblePaymentOptions, watch, setValue]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError(null);

        const payload = {
            customerName: data.fullName,
            customerEmail: data.email,
            customerPhone: data.phone,
            customerAddress: data.address,
            deliveryMethod: data.deliveryMethod,
            deliveryCost: deliveryPrice,
            customerComment: data.comments || "",
            paymentMethod: data.paymentMethod,
            language: lang,
            // Факт согласий — отправляем на бэк (для фиксации в заказе как
            // доказательства для РКН; бэк может сохранить или проигнорировать).
            personalDataConsent: Boolean(data.personalDataConsent),
            policyConsent: Boolean(data.policyConsent),
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity
            })),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: `${t.serverError}: ${res.statusText}` }));
                throw new Error(errorData.message || t.sendFail);
            }

            showToast('success', t.success);
            clearCart();
            action();

        } catch (error) {
            console.error("Order submit error:", error);
            setSubmitError(error.message);
            showToast('error', error.message || t.sendFail);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.root}>
            <div
                className={styles.buttonContainer}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={action}
                role="button"
                tabIndex={0}
            >
                <Image
                    src={isHovered ? '/images/hoverCross.svg' : '/images/cross.svg'}
                    alt={t.closeForm}
                    className={styles.crossIcon}
                    width={24}
                    height={24}
                />
            </div>
            <Image
                className={styles.logo}
                src={'/images/logo.png'}
                alt={t.logo}
                width={40}
                height={40}
            />
            <div className={styles.itemList}>
                {cartItems.length > 0 ? (
                    cartItems.map(item => <FormListItem key={item.id} item={item} />)
                ) : (
                    <p>{t.noItems}</p>
                )}
            </div>

            <div className={styles.totalSection}>
                {t.total}
                <span>{formattedFinalAmount}</span>
            </div>

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fullName" className={styles.label}>{t.fullName}</label>
                        <input id="fullName" type="text" className={styles.input} {...register('fullName', { required: t.reqName })} />
                        {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>{t.email}</label>
                        <input id="email" type="email" className={styles.input} {...register('email', { required: t.reqEmail, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t.badEmail } })} />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>{t.phone}</label>
                        {(() => {
                            const phoneReg = register('phone', {
                                required: t.reqPhone,
                                pattern: { value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, message: t.badPhone },
                            });
                            return (
                                <input
                                    id="phone"
                                    type="tel"
                                    inputMode="tel"
                                    placeholder="+7 (___) ___-__-__"
                                    className={styles.input}
                                    {...phoneReg}
                                    onChange={(e) => { e.target.value = formatPhone(e.target.value); phoneReg.onChange(e); }}
                                />
                            );
                        })()}
                        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="address" className={styles.label}>{t.address}</label>
                        <textarea id="address" className={styles.textarea} {...register('address', { required: t.reqAddress })} />
                        {errors.address && <p className={styles.error}>{errors.address.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <p className={styles.label}>{t.delivery}</p>
                        <div className={styles.radioGroup}>
                            {allDeliveryOptions.map(option => (
                                <div key={option.id} className={styles.radioOption}>
                                    <input
                                        type="radio"
                                        id={`delivery_${option.id}`}
                                        value={option.value}
                                        {...register('deliveryMethod', { required: t.reqDelivery })}
                                    />
                                    <label htmlFor={`delivery_${option.id}`}>{option.label} ({option.price === "0.00" ? t.free : `${parseFloat(option.price)} ₽`})</label>
                                </div>
                            ))}
                        </div>
                        {errors.deliveryMethod && <p className={styles.error}>{errors.deliveryMethod.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="comments" className={styles.label}>{t.comments}</label>
                        <textarea id="comments" className={styles.textarea} {...register('comments')} />
                    </div>

                    <div className={styles.formGroup}>
                        <p className={styles.label}>{t.payment}</p>
                        <div className={styles.radioGroup}>
                            {visiblePaymentOptions.map(option => (
                                <div key={option.id} className={styles.radioOption}>
                                    <input
                                        type="radio"
                                        id={`payment_${option.id}`}
                                        value={option.value}
                                        {...register('paymentMethod', { required: t.reqPayment })}
                                    />
                                    <label htmlFor={`payment_${option.id}`}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                        {errors.paymentMethod && <p className={styles.error}>{errors.paymentMethod.message}</p>}
                    </div>

                    <div className={styles.totalSection}>
                        {t.total}
                        <span>{formattedFinalAmount}</span>
                    </div>

                    {/* Два РАЗДЕЛЬНЫХ согласия (152-ФЗ / РКН): по умолчанию сняты,
                        оба обязательны. Ссылка на Политику видна до отправки. */}
                    <div className={styles.consentGroup}>
                        <label className={styles.consentOption}>
                            <input type="checkbox" {...register('personalDataConsent', { required: true })} />
                            <span>{t.consentPD}</span>
                        </label>
                        <label className={styles.consentOption}>
                            <input type="checkbox" {...register('policyConsent', { required: true })} />
                            <span>
                                {t.consentPolicyPre}
                                <Link href="/policy" target="_blank" rel="noopener noreferrer" className={styles.consentLink}>
                                    {t.consentPolicyLink}
                                </Link>
                            </span>
                        </label>
                        {(errors.personalDataConsent || errors.policyConsent) && (
                            <p className={styles.error}>{t.consentRequired}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting || !consentsGiven}
                    >
                        {isSubmitting ? t.submitting : t.pay}
                    </button>
                </form>
            </div>
            <Image
                className={styles.logo}
                src={'/images/logo.png'}
                alt={''}
                width={40}
                height={40}
            />

            {toast && typeof document !== 'undefined' && createPortal(
                <div className={`${styles.toast} ${toast.type === 'error' ? styles.toastError : styles.toastSuccess}`} role="status" aria-live="polite">
                    {toast.message}
                </div>,
                document.body
            )}
        </div>
    );
}