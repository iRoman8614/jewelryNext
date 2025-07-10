import Image from 'next/image';
import styles from './not-found.module.scss';
import NavBar from "@/components/NavBar/NavBar";
import { getNavigation } from '@/lib/api';
const logoSrc = '/images/logotipe.png';

export default async function NotFoundPage() {
    const navigationData = await getNavigation();

    return (
        <>
            <NavBar theme={'black'} navigation={navigationData} />
            <div className={styles.root}>
                <div className={styles.container}>
                    <div>
                        <Image
                            className={styles.image}
                            src={logoSrc}
                            alt="Логотип"
                            width={150}
                            height={150}
                        />
                    </div>
                    <div className={styles.title}>404 не найдено</div>
                </div>
            </div>
        </>
    );
}