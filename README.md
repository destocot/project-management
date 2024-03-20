<h1 align="center" id="title">Project Management</h1>

<p align="center"><img src="https://socialify.git.ci/destocot/project-management/image?description=1&amp;descriptionEditable=&amp;forks=1&amp;issues=1&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Diagonal%20Stripes&amp;pulls=1&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>

<p id="description">Full-stack project management application. Manage your projects through a kanban board inspired design.</p>

<p align="center"><img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&amp;logo=vite&amp;logoColor=FFD62E" alt="shields"><img src="https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&amp;logo=chakra-ui&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&amp;logo=redux&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB" alt="shields"><img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&amp;logo=react-router&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/Framer-black?style=for-the-badge&amp;logo=framer&amp;logoColor=blue" alt="shields"><img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&amp;logo=nestjs&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&amp;logo=postgresql&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/TypeORM-007ACC?style=for-the-badge&amp;logo=square" alt="shields"><img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&amp;logo=render&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&amp;logo=typescript&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&amp;logo=Swagger&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="shields"></p>

<h2>🚀 Demo</h2>

<p><b>Note:</b> This project is hosted on <a href="https://render.com/" target="_blank">render</a>'s generous free tier. You may need to wait 1-2 minutes for the website to start up.</p>

[https://project-management-26ne.onrender.com](https://project-management-26ne.onrender.com)

<h2>Project Screenshots:</h2>

<img src="https://i.imgur.com/3WUfytB.png" alt="project-screenshot" width="375" height="auto/">

<img src="https://i.imgur.com/FcQZUdw.png" alt="project-screenshot" width="375" height="auto/">

<img src="https://i.imgur.com/A9Qfkdh.png" alt="project-screenshot" width="375" height="auto/">

<img src="https://i.imgur.com/hrIbfbz.png" alt="project-screenshot" width="375" height="auto/">

<img src="https://i.imgur.com/jQj094u.png" alt="project-screenshot" width="375" height="auto/">

<img src="https://i.imgur.com/N4R3Oea.png" alt="project-screenshot" width="375" height="auto/">

<h2>🧐 Features</h2>

Here're some of the project's best features:

- Built on the scalable NestJS framework for a well-structured and maintainable TypeScript backend.
- Employs TypeORM as the ORM for efficient and type-safe interaction with a PostgreSQL database.
- Implements robust user authentication and session management using Passport.js.
- Utilizes the blazing-fast Vite.js build system for a streamlined development experience.
- Leverages React Router to enable seamless navigation within the application.
- Constructs a visually appealing and accessible user interface with the Chakra UI component library.
- Employs Redux for predictable and centralized state management.
- Auto generated Swagger API documentation for all API endpoints and schemas.

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone repository</p>

```
git clone https://github.com/destocot/project-management.git
```

<p>2. Enter client directory</p>

```
cd client
```

<p>3. Install client dependencies (use npm or yarn if prefer  red)</p>

```
pnpm install
```

<p>4. Enter server directory</p>

```
cd server
```

<p>5. Create .env file</p>

```
touch .enc
```

<p>6. Fill in PostgreSQL database environment variables (make sure the database you set in DB_NAME already exists)</p>

```
DB_HOST=FILL_ME DB_PORT=5432 DB_USERNAME=FILL_ME DB_PASSWORD=FILL_ME DB_NAME=FILL_ME
```

<p>7. Fill in JWT_SECRET environment variable</p>

```
JWT_SECRET=FILL_ME
```

<p>8. (Optional) Fill in PORT environment variable</p>

```
PORT=FILL_ME
```

<p>9. If PORT environment variable is differnet from 8080 edit in vite.config.ts in client directory</p>

```
 server: {
  proxy: {
    "/api": {
      target: "http://localhost:FILL_ME",
      changeOrigin: true
      }
    }
  }
```

<p>10. (Optional) Seed database in server directory</p>

```
pnpm db:seed email=FILL_ME passwod=FILL_ME
```

<p>11. Start vite.js server</p>

```
pnpm dev
```

<p>12. Start nest.js server</p>

```
pnpm start:dev
```

#### Issues

If you are having issues connecting to the database check for the following things.

- the database under the DB_NAME environment variable exists.
- if you have DB_SYNCHRONIZE set to false or undefined, you will need to either run the seed command (see installation step 10) or run a migration.

<b>Running a migration (pnpm will not work here, use npm to pass migration name)</b>

```
npm run migration:generate --name=FILL_ME
npm run migration:run
```
