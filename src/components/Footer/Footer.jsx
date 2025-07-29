'use client'
import Image from 'next/image';
import styles from './Footer.module.scss';

const tglogo = '/images/tglogo.svg'
const instalogo = '/images/instalogo.svg'
const walogo = '/images/walogo.svg'

import { footerData } from '@/lib/home-page.data.js';
import Link from "next/link";
import {useLanguage} from "@/components/LanguageProvider/LanguageProvider";

export default function Footer() {
    const {lang} = useLanguage()
    return (
        <footer className={styles.root} id={"contacts"}>
            <div className={styles.footerCatalogDesctop}>Мастерская: г. Москва, Звездный бульвар 21с3</div>
            <div className={styles.footerLine}>
                <div className={styles.links}>
                    <Image
                        className={styles.logo}
                        src={footerData.logo}
                        alt={'logo'}
                        width={100}
                        height={40}
                    />
                    <div className={styles.linksText}>
                        {footerData.contacts.email}
                    </div>
                    <div>
                        <Image src={instalogo} alt={''} width={20} height={20} />
                        <div className={styles.linksText}>{footerData.contacts.social}</div>
                    </div>
                    <div>
                        <Image src={tglogo} alt={''} width={20} height={20} />
                        <div className={styles.linksText}>{footerData.contacts.tg}</div>
                    </div>
                    <div>
                        <Image src={walogo} alt={''} width={20} height={20} />
                        <div className={styles.linksText}>{footerData.contacts.phone}</div>
                    </div>
                    {lang === 'ru' && <Link href={'/policy'} className={styles.linksText}>Публичная офферта</Link>}
                </div>
                <div className={styles.mobileFooterBottomLine}>
                    <Image
                        className={styles.logoMobile}
                        src={footerData.logo}
                        alt={'logo'}
                        width={100}
                        height={40}
                    />
                    {lang === 'ru' ? <div className={styles.msk}>moscow<br/>powered by<br/>scamdevs 2025</div> : <div className={styles.msk}>moscow<br/>powered by scamdevs 2025</div>}
                </div>
            </div>
        </footer>
    );
}