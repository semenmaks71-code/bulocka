# Романтический сайт для Арины — План реализации (Обновлённый)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать интерактивный кинематографический романтический сайт-подарок для Арины («Наша маленькая история ❤️», «Для моей Булочки») с секретным кодом на Supabase, квестом из 4 точных загадок, временной линией с 27 августа 2026 / 27 ноября 2026, плеерами для голосового и песни (с взаимной паузой и без автоплея), секретной комнатой, персональным финальным письмом с кнопкой пропуска анимации, повторными фейерверками и точной скачиваемой открыткой.

**Architecture:** Одностраничное React-приложение (SPA) на Vite + TypeScript с использованием Framer Motion для плавных кинематографических переходов между сценами (с поддержкой `prefers-reduced-motion`), Canvas для эффектов частиц (лепестки роз, золотая пыль, сердечки, фейерверки) и Supabase Edge Function для безопасной проверки секретного кода, rate limiting и одноразовой активации токена.

**Tech Stack:** React, Vite, TypeScript, Framer Motion, Tailwind CSS / CSS Modules, Supabase (Edge Functions / DB), html2canvas (для экспорта открытки).

**Spec:** Встроено в требования технического задания и дополнительные требования пользователя.

## Global Constraints

- Название: «Для Арины. Наша маленькая история ❤️»
- Дополнительное обращение: «Для моей Булочки»
- Дата начала отношений: 27 августа 2026 года
- Дата трёх месяцев: 27 ноября 2026 года
- Формат секретного кода: LOVE-XXXX (серверная проверка через Supabase Edge Function)
- Пути к аудио: `public/audio/voice-message.mp3`, `public/audio/our-song.mp3` (с фоллбеками при отсутствии файлов)
- Цветовая палитра: глубокий бордовый, почти чёрный, насыщенный тёмно-красный, благородное золото, нежный кремовый, пыльно-розовый.
- Mobile-first адаптивность.

## Review Focus

1. **Защита от подбора кода (Brute-force):** Ограничение попыток ввода кода на Supabase Edge Function и защита от перебора.
2. **Безопасность сессии:** Никаких секретных ключей или кодов во фронтенде; валидация токена на сервере, одноразовая активация кода.
3. **Аудиоконфликт:** Никакого автоплея; при воспроизведении одного трека (голос/песня) второй автоматически ставится на паузу.
4. **Регистронезависимость ответов на загадки:** 
   - «Дайвинчик» (давинчик, дайвинчик, Давинчик, Дайвинчик)
   - «Булочка» (булочка, Булочка)
   - «Я тебя люблю» (я тебя люблю, люблю тебя, я люблю тебя)
   - «Искренность» / «доброта» / «честность» (вариации и комбинации).
5. **Экспорт открытки:** Корректная генерация PNG открытки с точным текстом и без интерфейсных элементов сайта.

---

### Task 1: Инициализация проекта и базовой структуры

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`
- Create: `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Create: `public/audio/.gitkeep`, `src/types/index.ts`

**Interfaces:**
- Consumes: None
- Produces: Base React + Vite + TS structure with Tailwind / Framer Motion.

- [ ] **Step 1: Создать структуру папок и конфигурационные файлы в `/c/Users/Maxim/Documents/arina-romantic-story`**
- [ ] **Step 2: Установить зависимости (`framer-motion`, `lucide-react`, `@supabase/supabase-js`, `html2canvas`, `canvas-confetti`, `tailwindcss`, `postcss`, `autoprefixer`)**
- [ ] **Step 3: Настроить Tailwind CSS и кинематографические стили в `src/index.css` (бордовая гамма, золото, поддержка `prefers-reduced-motion`)**
- [ ] **Step 4: Проверить сборку (`npm run build`)**
- [ ] **Step 5: Commit**

```bash
git add package.json src/ index.html vite.config.ts tailwind.config.js
git commit -m "feat: initialize project structure, Tailwind, and dependencies"
```

---

### Task 2: Supabase интеграция и сервисы безопасности

**Files:**
- Create: `src/services/supabase.ts`, `src/services/auth.ts`
- Create: `supabase/migrations/20261126000000_init.sql`
- Create: `supabase/functions/verify-code/index.ts`

**Interfaces:**
- Consumes: Supabase credentials from `.env`
- Produces: `verifyAccessCode(code: string)`, `checkSavedToken()`, `saveToken(token: string)`

- [ ] **Step 1: Создать SQL миграцию Supabase** (таблицы `access_codes`, `access_tokens`, `attempt_logs` с защитой и rate limiting)
- [ ] **Step 2: Написать Supabase Edge Function `verify-code`** (серверная проверка LOVE-XXXX, одноразовость кода, выдача токена)
- [ ] **Step 3: Написать frontend auth service (`src/services/auth.ts`)** с валидацией токена на сервере и безопасным сохранением
- [ ] **Step 4: Commit**

```bash
git add supabase/ src/services/
git commit -m "feat: add secure supabase backend schema, edge function, and auth service"
```

---

### Task 3: Эффекты и визуальные компоненты (Particles, Hearts, Rose Petals, Fireworks)

**Files:**
- Create: `src/components/Particles.tsx`
- Create: `src/components/FloatingHearts.tsx`
- Create: `src/components/RosePetals.tsx`
- Create: `src/components/Fireworks.tsx`

**Interfaces:**
- Consumes: None
- Produces: Reusable background visual components with Framer Motion and Canvas, respecting `prefers-reduced-motion`.

- [ ] **Step 1: Создать компонент золотой пыли (`Particles.tsx`)**
- [ ] **Step 2: Создать компонент парящих сердец (`FloatingHearts.tsx`)**
- [ ] **Step 3: Создать компонент лепестков роз (`RosePetals.tsx`)**
- [ ] **Step 4: Создать компонент фейерверков (`Fireworks.tsx`) с возможностью перезапуска**
- [ ] **Step 5: Commit**

```bash
git add src/components/
git commit -m "feat: add visual particle effects, rose petals, and fireworks component"
```

---

### Task 4: Сцены 1-3 (Вступление, Секретный код, Конверт)

**Files:**
- Create: `src/scenes/IntroScene.tsx`
- Create: `src/scenes/SecretCodeScene.tsx`
- Create: `src/scenes/EnvelopeScene.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `verifyAccessCode` from `src/services/auth.ts`
- Produces: Scene state management (`intro` -> `code` -> `envelope` -> `quiz`).

- [ ] **Step 1: Создать Сцену 1 (`IntroScene.tsx`) — киновступление**
- [ ] **Step 2: Создать Сцену 2 (`SecretCodeScene.tsx`) — ввод кода с состояниями загрузки, успеха и ошибки, защитой от перебора**
- [ ] **Step 3: Создать Сцену 3 (`EnvelopeScene.tsx`) — открытие бордового конверта с золотой печатью**
- [ ] **Step 4: Интегрировать сцены в `App.tsx` с плавной сменой состояний**
- [ ] **Step 5: Commit**

```bash
git add src/scenes/IntroScene.tsx src/scenes/SecretCodeScene.tsx src/scenes/EnvelopeScene.tsx src/App.tsx
git commit -m "feat: implement intro, secret code with error/loading states, and envelope reveal"
```

---

### Task 5: Интерактивный квест — Четыре точные загадки (Сцена 4)

**Files:**
- Create: `src/scenes/QuizScene.tsx`
- Create: `src/components/RiddleCard.tsx`
- Create: `src/data/riddles.ts`

**Interfaces:**
- Consumes: Scene transition callback
- Produces: 4 interactive riddles with exact texts and flexible fuzzy matching for answers.

- [ ] **Step 1: Создать файл с загадками и ответами (`src/data/riddles.ts`)**
  - Загадка 1: Где началась наша маленькая история? -> Дайвинчик
  - Загадка 2: Моё особенное прозвище -> Булочка
  - Загадка 3: Самые дорогие слова -> Я тебя люблю
  - Загадка 4: Что я ценю в тебе? -> Искренность, доброта, честность (и вариации)
- [ ] **Step 2: Создать компонент карточки загадки (`RiddleCard.tsx`) с валидацией без учета регистра и пробелов**
- [ ] **Step 3: Создать контейнер квеста (`QuizScene.tsx`) с прогресс-баром (1/4 - 4/4) и эмоциональными реакциями**
- [ ] **Step 4: Commit**

```bash
git add src/scenes/QuizScene.tsx src/components/RiddleCard.tsx src/data/riddles.ts
git commit -m "feat: implement interactive 4-riddle romantic quest with exact questions and fuzzy matching"
```

---

### Task 6: Сцена воспоминаний и Временная линия (Сцены 5 и 6)

**Files:**
- Create: `src/scenes/MemoryScene.tsx`
- Create: `src/scenes/TimelineScene.tsx`
- Create: `src/data/timeline.ts`

**Interfaces:**
- Consumes: Riddle completion state
- Produces: «А помнишь?..» screen and Timeline with exact dates (27 августа 2026 - 27 ноября 2026).

- [ ] **Step 1: Создать Сцену «А помнишь?..» (`MemoryScene.tsx`) с плавным появлением текста**
- [ ] **Step 2: Создать Временную линию (`TimelineScene.tsx`) с этапами, датой знакомства (27 августа 2026) и трёх месяцев (27 ноября 2026)**
- [ ] **Step 3: Commit**

```bash
git add src/scenes/MemoryScene.tsx src/scenes/TimelineScene.tsx src/data/timeline.ts
git commit -m "feat: implement memory scene and cinematic timeline with 27 aug / 27 nov dates"
```

---

### Task 7: Аудио разделы: Голосовое сообщение и Песня (Сцены 7 и 8)

**Files:**
- Create: `src/components/AudioPlayer.tsx`
- Create: `src/scenes/VoiceScene.tsx`
- Create: `src/scenes/SongScene.tsx`

**Interfaces:**
- Consumes: Audio files from `public/audio/` (`voice-message.mp3`, `our-song.mp3`)
- Produces: Players with mutual pause mechanism and graceful fallbacks for missing files.

- [ ] **Step 1: Создать универсальный аудиоплеер (`AudioPlayer.tsx`) с волной, контролем громкости, защитой от автоплея и фоллбеком**
- [ ] **Step 2: Создать Сцену голосового сообщения (`VoiceScene.tsx`)**
- [ ] **Step 3: Создать Сцену авторской песни (`SongScene.tsx`)**
- [ ] **Step 4: Реализовать глобальный менеджер аудио (остановка одного трека при старте другого)**
- [ ] **Step 5: Commit**

```bash
git add src/components/AudioPlayer.tsx src/scenes/VoiceScene.tsx src/scenes/SongScene.tsx
git commit -m "feat: implement audio players with mutual pause and no autoplay"
```

---

### Task 8: Секретная комната и Финал с Письмом и Открыткой (Сцены 9-11)

**Files:**
- Create: `src/scenes/SecretRoomScene.tsx`
- Create: `src/scenes/FinaleScene.tsx`
- Create: `src/components/PostcardModal.tsx`
- Create: `src/data/letter.ts`
- Create: `src/utils/exportPostcard.ts`

**Interfaces:**
- Consumes: All previous progress
- Produces: Secret room portal, personal finale letter with typing animation & skip button, replayable fireworks, and exact PNG postcard export.

- [ ] **Step 1: Создать Секретную комнату со шкатулкой (`SecretRoomScene.tsx`)**
- [ ] **Step 2: Создать файл личного письма (`src/data/letter.ts`)**
- [ ] **Step 3: Создать Главный финал (`FinaleScene.tsx`) с эффектом печатания текста, кнопкой «Показать письмо полностью» и кнопкой перезапуска фейерверков**
- [ ] **Step 4: Создать компонент открытки (`PostcardModal.tsx`) с точным текстом («Арина ❤️ / С нашими тремя месяцами! / Ты — часть моей самой любимой истории. / И я счастлив, что эта история началась именно с тебя. / Твой Булочка ❤️») и экспортом в PNG через `html2canvas`**
- [ ] **Step 5: Commit**

```bash
git add src/scenes/SecretRoomScene.tsx src/scenes/FinaleScene.tsx src/components/PostcardModal.tsx src/data/letter.ts src/utils/exportPostcard.ts
git commit -m "feat: implement secret room, finale letter with typing skip, replayable fireworks, and exact postcard export"
```

---

### Task 9: Деплой, документация и финальная проверка

**Files:**
- Create: `README.md`, `.env.example`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: Complete project codebase
- Produces: GitHub Pages workflow and comprehensive setup documentation.

- [ ] **Step 1: Создать GitHub Actions workflow для деплоя на GitHub Pages (`.github/workflows/deploy.yml`)**
- [ ] **Step 2: Создать подробный `README.md` с инструкциями по Supabase, аудио и запуску**
- [ ] **Step 3: Создать `.env.example`**
- [ ] **Step 4: Запустить сборку (`npm run build`) и проверить отсутствие ошибок**
- [ ] **Step 5: Commit**

```bash
git add README.md .env.example .github/workflows/
git commit -m "feat: add deployment workflow and documentation"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-11-26-arina-romantic-story-design.md`. Using **Native** execution approach as requested. Starting execution of Task 1 immediately.