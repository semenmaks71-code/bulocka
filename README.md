# Для Арины. Наша маленькая история ❤️

Кинематографический романтический сайт-подарок для Арины («Для моей Булочки»).

## Возможности

- 🎬 Кинематографическое вступление с анимациями
- 🔐 Секретный код (формат LOVE-XXXX)
- 📬 Красивый конверт с золотой печатью
- 🧩 Интерактивный квест из 4 загадок
- 💭 Сцена воспоминаний «А помнишь?..»
- 📅 Временная линия отношений (27 августа — 27 ноября 2026)
- 🎵 Аудиоплееры для голосового и песни
- 💎 Секретная комната со шкатулкой
- ✉️ Персональное письмо с эффектом печатания
- 🎆 Фейерверки и праздничное оформление
- 🖼️ Цифровая открытка с экспортом в PNG

## Технологии

- React, Vite, TypeScript
- Tailwind CSS (кинематографическая палитра)
- Framer Motion (плавные анимации)
- Supabase (Edge Functions / DB)
- html2canvas (экспорт открытки)

## Запуск локально

```bash
# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Собрать для production
npm run build
```

## Настройка Supabase (опционально)

1. Создайте проект на [supabase.com](https://supabase.com)
2. Выполните миграцию `supabase/migrations/20261126000000_init.sql`
3. Задепло Edge Function `supabase/functions/verify-code/index.ts`
4. Создайте `.env` файл:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Добавьте код в таблицу `access_codes` (например, LOVE-7777)

Без Supabase сайт работает в режиме fallback — принимает любой код формата LOVE-XXXX.

## Добавление аудио

Положите файлы в папку `public/audio/`:
- `voice-message.mp3` — ваше голосовое сообщение
- `our-song.mp3` — авторская песня

## Деплой на GitHub Pages

1. Создайте репозиторий на GitHub
2. Запушьте код
3. Настройте GitHub Pages в настройках репозитория (Settings → Pages → Deploy from main branch)
4. Добавьте секреты в репозиторий (Settings → Secrets → Actions):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Структура проекта

```
src/
├── components/       # UI компоненты
│   ├── visual/      # SVG визуализации
│   └── ...
├── scenes/          # Сцены приложения
├── data/            # Контент (загадки, письмо, даты)
├── services/        # Supabase и авторизация
├── types/           # TypeScript типы
└── App.tsx          # Главный компонент
```

## Лицензия

ISC