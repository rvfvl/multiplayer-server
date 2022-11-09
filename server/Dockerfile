FROM node:18-alpine3.14 as base

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

FROM base as production

RUN npm run build