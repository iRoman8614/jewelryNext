import Image from 'next/image';
import styles from './policy.module.scss';
import NavBar from "@/components/NavBar/NavBar";
import { getNavigation } from '@/lib/api';
import {ServiceContent, ServiceTitle} from "@/components/serviceContent/ServiceContent";

const logoSrc = '/images/logo.png';

export const metadata = {
    title: 'Правила и Условия – 27jwlr',
    description: 'Правила возврата товаров, условия предоставления услуг, способы оплаты и политика конфиденциальности ювелирного магазина 27jwlr.',
};

export default async function ServicePage() {
    const navigationData = await getNavigation();
    return (
        <>
            <NavBar theme={'black'} navigation={navigationData} />
            <div className={styles.root}>
                <ServiceTitle />
                <div>
                    <Image
                        className={styles.logo}
                        src={logoSrc}
                        alt=""
                        width={70}
                        height={70}
                    />
                </div>
                <ServiceContent />
            </div>
        </>
    );
}