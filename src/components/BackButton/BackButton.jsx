"use client";
import { useRouter } from 'next/navigation';
import styles from './BackButton.module.scss';
import {useLanguage} from "@/components/LanguageProvider/LanguageProvider";

export default function BackButton() {
    const { lang } = useLanguage();
    const router = useRouter();
    return <button className={styles.back} onClick={() => router.back()}>{lang === 'ru' ? 'НАЗАД' : 'BACK'}</button>;
}