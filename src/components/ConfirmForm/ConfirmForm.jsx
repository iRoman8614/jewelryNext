"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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

    const selectedDeliveryValue = watch('deliveryMethod');

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

        const deliveryMethodObject = allDeliveryOptions.find(opt => opt.value === data.deliveryMethod);
        const paymentMethodObject = allPaymentOptions.find(opt => opt.value === data.paymentMethod);

        const payload = {
            customerName: data.fullName,
            customerEmail: data.email,
            customerPhone: data.phone,
            customerAddress: data.address,
            deliveryMethod: data.deliveryMethod,
            deliveryCost: deliveryPrice,
            customerComment: data.comments || "",
            paymentMethod: data.paymentMethod,
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
                const errorData = await res.json().catch(() => ({ message: `Ошибка сервера: ${res.statusText}` }));
                throw new Error(errorData.message || 'Не удалось отправить заказ.');
            }

            alert('Заказ успешно оформлен!');
            clearCart();
            action();

        } catch (error) {
            console.error("Ошибка при отправке заказа:", error);
            setSubmitError(error.message);
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
                    alt="Закрыть форму"
                    className={styles.crossIcon}
                    width={24}
                    height={24}
                />
            </div>
            <Image
                className={styles.logo}
                src={'/images/logo.png'}
                alt={'Логотип'}
                width={40}
                height={40}
            />
            <div className={styles.itemList}>
                {cartItems.length > 0 ? (
                    cartItems.map(item => <FormListItem key={item.id} item={item} />)
                ) : (
                    <p>Товаров нет</p>
                )}
            </div>

            <div className={styles.totalSection}>
                ИТОГО
                <span>{formattedFinalAmount}</span>
            </div>

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fullName" className={styles.label}>ФИО</label>
                        <input id="fullName" type="text" className={styles.input} {...register('fullName', { required: 'ФИО обязательно для заполнения' })} />
                        {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>ПОЧТА</label>
                        <input id="email" type="email" className={styles.input} {...register('email', { required: 'Почта обязательна для заполнения', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Неверный формат email адреса' } })} />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>ТЕЛЕФОН</label>
                        <input id="phone" type="tel" className={styles.input} {...register('phone', { required: 'Телефон обязателен для заполнения', pattern: { value: /^[+]?[0-9\s\-()]{7,20}$/, message: 'Неверный формат телефона' } })} />
                        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="address" className={styles.label}>АДРЕС</label>
                        <textarea id="address" className={styles.textarea} {...register('address', { required: 'Адрес обязателен для заполнения' })} />
                        {errors.address && <p className={styles.error}>{errors.address.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <p className={styles.label}>ДОСТАВКА</p>
                        <div className={styles.radioGroup}>
                            {allDeliveryOptions.map(option => (
                                <div key={option.id} className={styles.radioOption}>
                                    <input
                                        type="radio"
                                        id={`delivery_${option.id}`}
                                        value={option.value}
                                        {...register('deliveryMethod', { required: 'Выберите способ доставки' })}
                                    />
                                    <label htmlFor={`delivery_${option.id}`}>{option.label} ({option.price === "0.00" ? (lang === 'ru' ? "Бесплатно" : "free") : `${parseFloat(option.price)} ₽`})</label>
                                </div>
                            ))}
                        </div>
                        {errors.deliveryMethod && <p className={styles.error}>{errors.deliveryMethod.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="comments" className={styles.label}>КОММЕНТАРИИ</label>
                        <textarea id="comments" className={styles.textarea} {...register('comments')} />
                    </div>

                    <div className={styles.formGroup}>
                        <p className={styles.label}>СПОСОБ ОПЛАТЫ</p>
                        <div className={styles.radioGroup}>
                            {visiblePaymentOptions.map(option => (
                                <div key={option.id} className={styles.radioOption}>
                                    <input
                                        type="radio"
                                        id={`payment_${option.id}`}
                                        value={option.value}
                                        {...register('paymentMethod', { required: 'Выберите способ оплаты' })}
                                    />
                                    <label htmlFor={`payment_${option.id}`}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                        {errors.paymentMethod && <p className={styles.error}>{errors.paymentMethod.message}</p>}
                    </div>

                    <div className={styles.totalSection}>
                        ИТОГО
                        <span>{formattedFinalAmount}</span>
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                        {isSubmitting ? 'ОТПРАВКА...' : 'ОПЛАТИТЬ'}
                    </button>
                    {submitError && <p className={styles.error}>{submitError}</p>}
                </form>
            </div>
            <Image
                className={styles.logo}
                src={'/images/logo.png'}
                alt={''}
                width={40}
                height={40}
            />
        </div>
    );
}