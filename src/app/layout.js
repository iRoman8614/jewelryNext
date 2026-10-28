import './globals.scss';
import { Providers } from '@/components/Providers';
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import CartFloatingButton from "@/components/CartFloatingButton/CartFloatingButton";

export const metadata = {
    title: '27JWLR',
    description: 'Описание для поисковых систем',
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
        <body>
        <Providers>
            {children}
            <CookieConsent />
            <CartFloatingButton />
        </Providers>
        <ScrollToTopButton />
        </body>
        </html>
    );
}