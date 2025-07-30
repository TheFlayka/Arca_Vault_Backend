# Arca Vault (Backend) 
<img width="700" height="200" alt="READMEMarkdownBackend" src="https://github.com/user-attachments/assets/a797bab5-6835-4654-9934-1f5297bf0bdd" />

## Добро пожаловать в репозиторий бэкэнда Arca Vault. 

_(В разделе [Wiki](https://github.com/TheFlayka/Arca_Vault_Backend/wiki) вы найдете больше информаций о репозиторий и бэкэнде)_

Arca Vault - это проект копилка с историей, графиками, темпом и в будущем еще больше функционалом. На данный момент бэкэнд все еще переписывается на Typescript.
***
### Библиотеки и основа проекта:
Бэкэнд написан на Node.js (Typescript) с использованием Express. База данных работает на MongoDB

> Дополнительные бибилотеки: 
> * ESLint и Prettier 
> * Vitest (Unit тесты)
> * bcrypt (Хэширование пароля)
> * jsonwebtoken (Для токенов)
> * Nodemon (Для dev разработки)

***
### Как установить проект?
Для начала скопируйте репозиторий через git или скачайте проект
```bash
git clone https://github.com/TheFlayka/Arca_Vault_Backend.git
```
***
#### .env 
Затем настройте .env файл. 
Для начало меняем названия .env.example на .env. В файле уже написаны нужные переменные и остается только добавить значения. 

> PORT может быть каким угодно, тут уже на ваше усмотрение.

>  JWT_SECRET_ACCESS и JWT_SECRET_REFRESH - это подпись для токенов. Тут также можно поставить что угодно, но я не советую делать так на практике. Если нужно сгенерировать, то могу посоветовать эту [статью](https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4)

> MONGO_URL - это ссылка на базу данных MongoDB. Я использую MongoDB Atlas которая предоставляет облачную БД, но вы можете использовать ссылку на вашу локальную MongoDB (в этом случаи нужен Docker). Или же создайте базу данных в MongoDB Atlas
***

#### Устанвка и запуск
_В качестве примера используется Yarn._

```bash
yarn
yarn start
```

Dev режим

```bash
yarn dev
```

Сборка проекта

```bash
yarn build
```
***
### Команды

Форматирование (Prettier)
```bash
yarn format
```

Линт (ESLint)
```bash
yarn lint
yarn lint:fix
```

Тестирование 
```bash
yarn test
```
