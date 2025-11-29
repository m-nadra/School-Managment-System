FROM node:current-alpine3.22@sha256:e8e882c692a08878d55ec8ff6c5a4a71b3edca25eda0af4406e2a160d8a93cf2 AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "run", "dev"]