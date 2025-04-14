#build
FROM node:20 AS builder

WORKDIR /app
COPY . .

ARG BUILD_ENV=homo
ENV NODE_ENV=$BUILD_ENV

RUN npm install && npm run build:homo

#serve
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY --chown=nginx:nginx nginx/ /etc/nginx/

EXPOSE 80 443
