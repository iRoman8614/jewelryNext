"use client";
import { useRouter } from 'next/navigation';
import styles from './BackButton.module.scss';

export default function BackButton() {
    const router = useRouter();
    return <button className={styles.back} onClick={() => router.back()}>НАЗАД</button>;
}