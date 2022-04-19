# superheros-back-end

## В проекті використана версія Node.js v16.14.0 та MongoDB Atlas.

Перед запуском потрібно виконати команду

- `npm i` &mdash; та за шаблоном додати ".env" файл з власними параметрами

server: http://localhost:3000

Users endpoints : method:Post

/api/users/registration , /api/users/login

examlpe body { "email":"name1@email.com", "password":"password" }

, /api/users/logout

Superheros endpoints (after login) :

Для всіх ендпоінтів потрібно додавати хедер Authorization: Bearer {Token}

- Create superhero{method:Post /api/superheros}
- example body { "nickname":"nickname", "real_name": "name", }

- Get all superheros{method:Get /api/superheros}

- Get superhero by id {method:Get /api/superheros/{"superhero-id"}}

- Delete superhero {method:Delete /api/superheros/{"superhero-id"}}

- Update superhero{method:Put /api/superheros/{"superhero-id"}}
- example body { "nickname":{"nickname"}, "real_name": {"name"}, }

- Update superhero image{method:Patch /api/superheros/{"superhero-id"}/images/}
- example body { form-data: image type:file your image}

- Get superhero image{method:Get /{"superhero-id"}/{"image-full-name"}/}

### Команди старту:

- `npm start` &mdash; старт сервера в режимі (production)
- `npm run start:dev` &mdash; старт сервера в режимs разробки (development)
