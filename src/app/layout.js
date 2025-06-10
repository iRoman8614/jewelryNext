// src/app/layout.js
import './globals.scss';

// Импортируем провайдеры для библиотек (когда они понадобятся)
import { Providers } from '@/components/Providers';

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
            </Providers>
        </body>
      </html>
  );
}