# ПЕРВАЯ ДОМАШКА

### Предварительный тайминг работы - 5 часов;

### Фактически затраченное время - 7 часоа;

---

1. Изучение и запуск приложения - 2 часа

2. Создание чек-бокса - 1.5 часа

3. Написание логики простой игры(3 жизни) 1.5 часа

4. Скрытие неправильно угаданной пары - 2 часа

# ВТОРАЯ ДОМАШКА

### Предварительный тайминг работы - 7 часов;

### Фактически затраченное время - 10 часов;

---

1. Добавление лидерБорда - 2 часа

2. Добавление имя пользователя - 1.5 часа

3. Написание логики попадания в лидерборд - 5 часов

4. дизайн и настройка css - 1 час

# КУРСОВАЯ РАБОТА

### Предварительный тайминг работы - 7 часов;

### Фактически затраченное время - 9 часов;

1. Отображение ачивок - 2 часа

2. Добавление суперспособностей - 3 часа

3. Отправка на лидер борд с ачивками - 4 часа

# MVP Карточная игра "Мемо"

В этом репозитории реализован MVP карточкой игры "Мемо" по [тех.заданию](./docs/mvp-spec.md)

Проект задеплоен на gh pages:
https://skypro-web-developer.github.io/react-memo/

## Разработка

Проект реализован на основе шаблона [Create React App](https://github.com/facebook/create-react-app).

### Как разрабатывать

- Установите зависимости командой `npm install`
- Запустите dev сервер `npm start`
- Откройте адрес в браузере

### Стек и инструменты

Для стилей в коде используются css modules.

Настроены eslint и prettier. Корректность кода проверяется автоматически перед каждым коммитом с помощью lefthook (аналог husky). Закомитить код, который не проходит проверку eslint не получится.

### Доступные команды

#### `npm start`

Запускает приложение в режиме разработки.

Откройте [http://localhost:3000](http://localhost:3000) чтобы посмотреть его в браузере.

#### `npm run build`

Собирает оптимизированный и минифицированный продакшен билд приложения в папку `build`.
После сборке, приложение готово к деплою.

#### `npm run deploy`

Деплоит приложение в github pages. По сути, запускает сборку и коммитит билд в ветку gh-pages.

(!) github pages должен быть включен в настройках репозитория и настроен на ветку gh-pages

#### `npm run lint`

Запускает eslint проверку кода, эта же команда запускается перед каждым коммитом.
Если не получается закоммитить, попробуйте запустить эту команду и исправить все ошибки и предупреждения.
