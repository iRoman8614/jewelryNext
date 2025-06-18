"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import styles from './ConfirmForm.module.scss';

import { deliveryOptions, paymentOptions } from "@/lib/form.data.js";
import FormListItem from "@/components/FormListItem/FormListItem";

export default function ConfirmForm({ action, cartItems = [] }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const [isHovered, setIsHovered] = useState(false);

    const onSubmit = (data) => {
        const fullOrder = {
            ...data,
            items: cartItems,
            totalAmount: "198K",
        };
        console.log("Form Data:", fullOrder);
        alert('Данные формы отправлены! Смотрите консоль.');
    };

    const totalAmount = "198K";

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
                    <>
                        <FormListItem />
                        <FormListItem />
                    </>
                )}
            </div>

            <div className={styles.totalSection}>
                ИТОГО
                <span>{totalAmount}</span>
            </div>

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fullName" className={styles.label}>ФИО</label>
                        <input
                            id="fullName"
                            type="text"
                            className={styles.input}
                            {...register('fullName', { required: 'ФИО обязательно для заполнения' })}
                        />
                        {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>ПОЧТА</label>
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            {...register('email', {
                                required: 'Почта обязательна для заполнения',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Неверный формат email адреса'
                                }
                            })}
                        />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>ТЕЛЕФОН</label>
                        <input
                            id="phone"
                            type="tel"
                            className={styles.input}
                            {...register('phone', {
                                required: 'Телефон обязателен для заполнения',
                                pattern: {
                                    value: /^[+]?[0-9\s\-()]{7,20}$/,
                                    message: 'Неверный формат телефона'
                                }
                            })}
                        />
                        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="address" className={styles.label}>АДРЕС</label>
                        <textarea
                            id="address"
                            className={styles.textarea}
                            {...register('address', { required: 'Адрес обязателен для заполнения' })}
                        />
                        {errors.address && <p className={styles.error}>{errors.address.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <p className={styles.label}>ДОСТАВКА</p>
                        <div className={styles.radioGroup}>
                            {deliveryOptions.map(option => (
                                <div key={option.id} className={styles.radioOption}>
                                    <input
                                        type="radio"
                                        id={option.id}
                                        value={option.value}
                                        {...register('deliveryMethod', { required: 'Выберите способ доставки' })}
                                    />
                                    <label htmlFor={option.id}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                        {errors.deliveryMethod && <p className={styles.error}>{errors.deliveryMethod.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="comments" className={styles.label}>КОММЕНТАРИИ</label>
                        <textarea
                            id="comments"
                            className={styles.textarea}
                            {...register('comments')}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <p className={styles.label}>СПОСОБ ОПЛАТЫ</p>
                        <div className={styles.radioGroup}>
                            {paymentOptions.map(option => (
                                <div key={option.id} className={styles.radioOption}>
                                    <input
                                        type="radio"
                                        id={option.id}
                                        value={option.value}
                                        {...register('paymentMethod', { required: 'Выберите способ оплаты' })}
                                    />
                                    <label htmlFor={option.id}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                        {errors.paymentMethod && <p className={styles.error}>{errors.paymentMethod.message}</p>}
                    </div>

                    <div className={styles.totalSection}>
                        ИТОГО
                        <span>{totalAmount}</span>
                    </div>
                    <button type="submit" className={styles.submitButton}>ОПЛАТИТЬ</button>
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