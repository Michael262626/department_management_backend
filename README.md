
## Description

# Department Management App

A full-stack web application for managing departments, built with **React (Frontend)** and **NestJS (Backend)**.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** NestJS, TypeScript, PostgreSQL
- **State Management:** Redux Toolkit
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📁 Project Structure

```bash
.
├── department_management_frontend  # React frontend
├── department_management_backend   # NestJS backend

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

$ npm install -g @nestjs/mau
$ mau deploy
 

PORT=3000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3001
