FROM node:18-alpine3.14 as base

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV SECRET_KEY=test123

FROM base as production

RUN npm run build