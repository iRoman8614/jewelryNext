import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import ContactsClient from '@/components/Contacts/ContactsClient';
import { getNavigation, getSalesPoints } from '@/lib/api';

export const metadata = {
    title: 'Контакты – 27jwlr',
    description: 'Контакты ювелирной мастерской 27JWLR и точки продаж, где представлены изделия.',
};

// Рендер против живого бэка: точки продаж редактируются в админке и должны
// появляться без пересборки (как остальной контент).
export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
    const [navigationData, salesPoints] = await Promise.all([
        getNavigation(),
        getSalesPoints(),
    ]);

    return (
        <>
            <NavBar theme={'black'} navigation={navigationData} />
            <ContactsClient salesPoints={salesPoints} />
            <Footer />
        </>
    );
}