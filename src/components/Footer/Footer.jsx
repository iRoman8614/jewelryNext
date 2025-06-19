import Image from 'next/image';
import styles from './Footer.module.scss';

import { footerData } from '@/lib/home-page.data.js';

export default function Footer() {
    return (
        <footer id={"contacts"}>
            <div>
                <div
                    className={styles.footerText}
                    dangerouslySetInnerHTML={{ __html: footerData.text }}
                />
            </div>
            <div className={styles.footerLine}>
                <div className={styles.links}>
                    <Image
                        className={styles.logo}
                        src={footerData.logo}
                        alt={'logo'}
                        width={100}
                        height={40}
                    />
                    <div>{footerData.contacts.email}</div>
                    <div>{footerData.contacts.social}</div>
                    <div>{footerData.contacts.tg}</div>
                    <div>{footerData.contacts.phone}</div>
                </div>
                <div className={styles.msk}>moscow<br/>powered by scamdevs 2025</div>
            </div>
        </footer>
    );
}