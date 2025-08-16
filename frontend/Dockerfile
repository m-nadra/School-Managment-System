FROM node:current-alpine3.22@sha256:e8e882c692a08878d55ec8ff6c5a4a71b3edca25eda0af4406e2a160d8a93cf2 AS builder
RUN apk add dumb-init
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN dumb-init npm run build

FROM nginx:stable-alpine3.21-perl@sha256:71584d41516107f8cfcf5bc2280f0886f2cf821bd2b42d5cf56e96b02bcdb92a
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]