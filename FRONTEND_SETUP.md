# Фронт в локальном контейнере + связь с бэком

Бэк и mysql уже крутятся в своих контейнерах (отдельный репозиторий).
Фронт поднимаем в СВОЁМ контейнере и подключаем к сети бэка.

## Шаги

1) Узнай имя docker-сети бэка:
   docker network ls | grep jewelry
   (обычно jewelryback_jewelry-net — по имени папки бэка)

2) Если имя отличается от дефолта — задай его:
   export BACKEND_NETWORK=имя_сети_бэка        # Linux/Mac
   (или впиши в docker-compose.yml вместо дефолта)

3) Подними фронт:
   docker compose up --build
   Откроется на http://localhost:3000

## Как фронт находит бэк (уже настроено в docker-compose.yml)

- Браузер -> бэк:  http://localhost:5050   (хостовый порт, что публикует бэк)
- Серверный рендеринг внутри контейнера -> бэк:  http://backend:5050  (сеть docker)
- Картинки грузятся с http://localhost:5050/uploads/... (браузером)

CORS на бэке уже пускает http://localhost:3000 — менять ничего не надо.

## Запуск БЕЗ контейнера (альтернатива, на хосте)

cp .env.local.example .env.local      # NEXT_PUBLIC_API_BASE_URL=http://localhost:5050
npm install && npm run dev

## Файлы

ОБНОВИТЬ:
  next.config.mjs
  src/lib/api.js
  src/app/page.js
  src/app/gallery/page.jsx
  src/app/category/[[...slug]]/page.jsx
  src/app/item/[id]/page.jsx
НОВЫЕ:
  src/app/api/revalidate/route.js   (приёмник ревалидации)
  docker-compose.yml                (ЛОКАЛЬНЫЙ контейнер фронта — для разработки)
  Dockerfile                        (для будущего ПРОД-деплоя, локально не нужен)
  .dockerignore
  .env.local.example                (для запуска на хосте без контейнера)
