import { Suspense } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import PaymentResultClient from '@/components/PaymentResult/PaymentResultClient';
import { getNavigation } from '@/lib/api';

export const metadata = {
    title: 'Оплата заказа – 27jwlr',
    robots: { index: false, follow: false },
};

// Сюда ЮKassa возвращает покупателя после оплаты (return_url).
// Статус всегда берётся с бэка (он перепроверяет его в ЮKassa) — по самому
// факту возврата на эту страницу оплату успешной не считаем.
export const dynamic = 'force-dynamic';

export default async function PaymentResultPage() {
    const navigationData = await getNavigation();
    return (
        <>
            <NavBar theme={'black'} navigation={navigationData} />
            <Suspense fallback={null}>
                <PaymentResultClient />
            </Suspense>
            <Footer />
        </>
    );
}
