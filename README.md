# Avito
Выполнение тестовых заданий на стажировку в Авито

# Технологический стек
Playwright - фреймворк для автоматизации тестирования
JavaScript - язык написания тестов
Chrome - браузер для выполнения тестов

#Структура проекта
project/
├── tests/
│   └── task-tracker.spec.js    # Основные тест-кейсы
├── playwright.config.js         # Конфигурация Playwright
├── package.json                # Зависимости проекта
└── README.md                   # Документация

#Предварительные требования
Node.js версии 16 или выше
Google Chrome версии 127+

#Установка зависимостей
bash
npm init -y
npm install @playwright/test
npx playwright install

#Запуск тестов
Базовый запуск
bash
npx playwright test

Запуск с UI
bash
npx playwright test --headed

#Особенности реализации
Проблема с маршрутизацией
Приложение использует клиентский роутинг (SPA), поэтому:
Все тесты начинаются с корневого URL
Прямые переходы на /issues и /boards возвращают 404
Навигация осуществляется через UI элементы
