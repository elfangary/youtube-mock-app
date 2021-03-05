# build stage
FROM node:lts-alpine as build-stage

WORKDIR /app

ARG VUE_APP_YOUTUBE_API_BASE_URL

ARG VUE_APP_API_KEY

ENV VUE_APP_YOUTUBE_API_BASE_URL=$YOUTUBE_API_BASE_URL VUE_APP_API_KEY=API_KEY

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]