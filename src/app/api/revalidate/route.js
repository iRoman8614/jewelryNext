import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

// On-demand ISR. Бэкенд зовёт этот эндпоинт после изменений, чтобы
// мгновенно сбросить кэш нужных страниц вместо ожидания таймера revalidate.
//
// Контракт (POST application/json):
//   {
//     "secret": "<REVALIDATE_SECRET>",
//     "tags":  ["products", "product-123", "content", "navigation"],   // опц.
//     "paths": ["/", "/gallery", "/item/123"]                          // опц.
//   }
//
// Теги соответствуют тем, что проставлены в src/lib/api.js:
//   navigation | content | checkout | products | product-{id}
//
// Секрет должен совпадать с переменной REVALIDATE_SECRET на фронте.
export async function POST(request) {
    const secret = process.env.REVALIDATE_SECRET;
    if (!secret) {
        return NextResponse.json(
            { revalidated: false, message: 'REVALIDATE_SECRET is not configured.' },
            { status: 500 },
        );
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { revalidated: false, message: 'Invalid JSON body.' },
            { status: 400 },
        );
    }

    if (body?.secret !== secret) {
        return NextResponse.json(
            { revalidated: false, message: 'Invalid secret.' },
            { status: 401 },
        );
    }

    const tags = Array.isArray(body.tags) ? body.tags : [];
    const paths = Array.isArray(body.paths) ? body.paths : [];

    try {
        for (const tag of tags) {
            if (typeof tag === 'string' && tag.length > 0) revalidateTag(tag);
        }
        for (const path of paths) {
            if (typeof path === 'string' && path.startsWith('/')) revalidatePath(path);
        }
    } catch (error) {
        return NextResponse.json(
            { revalidated: false, message: 'Revalidation failed.', error: String(error) },
            { status: 500 },
        );
    }

    return NextResponse.json({ revalidated: true, tags, paths, now: Date.now() });
}
