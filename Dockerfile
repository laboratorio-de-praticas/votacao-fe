FROM node:22.14.0-alpine3.21

WORKDIR /app

COPY package*.json ./

RUN npm i -g next@15.2.2

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

ENTRYPOINT [ "npm", "start" ]
