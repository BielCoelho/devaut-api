FROM node:lts-alpine

WORKDIR /usr/app/devault

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "start:dev"]