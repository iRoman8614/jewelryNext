import './globals.scss';
import { Providers } from '@/components/Providers';
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import CartFloatingButton from "@/components/CartFloatingButton/CartFloatingButton";
import SitePreloader, { PRELOADER_HEAD_SCRIPT } from "@/components/SitePreloader/SitePreloader";

export const metadata = {
    title: '27JWLR',
    description: 'Описание для поисковых систем',
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru" suppressHydrationWarning>
        <head>
            {/* До отрисовки: если прелоадер сегодня уже показывали — прячем его. */}
            <script dangerouslySetInnerHTML={{ __html: PRELOADER_HEAD_SCRIPT }} />
        </head>
        <body>
        <SitePreloader />
        <Providers>
            {children}
            <CartFloatingButton />
        </Providers>
        <ScrollToTopButton />
        </body>
        </html>
    );
}