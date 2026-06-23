/** @type {import('next').NextConfig} */
const nextConfig = {
    // Раньше тут стоял output: 'export' (чистая статика). Перешли на ISR:
    // Next работает как лёгкий Node-сервер (standalone-сборка для Docker),
    // маркетинговые страницы кэшируются «как статика», а каталог/карточка/архив
    // ревалидируются по таймеру и точечно по событию из админки.
    output: 'standalone',

    // Картинки приходят с того же домена через nginx (/uploads). Оптимизацию
    // next/image НЕ включаем, чтобы не менять текущее поведение разметки —
    // оставляем unoptimized, как было.
    images: {
        unoptimized: true,
        remotePatterns: [
            { protocol: 'https', hostname: '**' },
        ],
    },
};

export default nextConfig;
