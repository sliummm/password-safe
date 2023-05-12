#stage 1
FROM node:latest as node
LABEL author="Shu Liu"

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN npm install

COPY  . /app
RUN npm build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/angular_exercise /usr/share/nginx/html

ENTRYPOINT ["npm","start"]