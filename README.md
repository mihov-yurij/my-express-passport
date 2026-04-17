🚀 Express Secure App: Cookies, Passport & Session Auth
Учебный проект на Node.js и Express, демонстрирующий реализацию надежной аутентификации на основе сессий с использованием Passport.js.
🌟 Ключевые возможности
🔑 Аутентификация через Passport.js: Использование Local Strategy для входа по email и паролю.
🛡 Управление сессиями: Безопасное хранение состояния пользователя через express-session и Cookies.
🎨 Theme Switcher: Сохранение предпочтений темы оформления (Light/Dark) в браузере.
💾 JSON Persistence: Чтение и запись данных (пользователи, статьи) в локальные JSON-файлы.
🧱 MVC Архитектура: Разделение ответственности между маршрутами, представлениями и логикой обработки данных.
🛠 Технологический стек
Backend: Node.js, Express.js
Auth: Passport.js, express-session
Security: Helmet, connect-flash
Templates: EJS
Logging: Morgan
📂 Структура проекта
text
├── data/                # Хранилище данных (users.json, articles.json)
├── public/              # Статические файлы (CSS, изображения)
├── src/
│   ├── routes/          # Маршрутизация (index, articles, users)
│   ├── utils/           
│   │   ├── passport.js  # Конфигурация стратегии аутентификации
│   │   ├── fileHelper.js # Утилита для работы с файловой системой
│   │   └── authMiddleware.js # Проверка доступа к ресурсам
│   └── views/           # Шаблоны страниц (EJS)
├── src/app.js           # Конфигурация Express и Middleware
└── server.js            # Точка входа в приложение

⚙️ Установка и запуск
Установка зависимостей:
bash
npm install
Используйте код с осторожностью.
Запуск в режиме разработки:
bash
npm run dev
Используйте код с осторожностью.
Логин по умолчанию:
Email: yura@example.com
Password: 123
🔗 Основные маршруты
GET / — Главная страница со списком статей.
GET /login — Страница авторизации.
POST /login — Обработка входа через Passport.
GET /logout — Выход из системы и удаление сессии.
GET /articles — Просмотр статей (защищено для некоторых действий).