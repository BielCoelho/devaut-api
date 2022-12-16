FROM node:lts

WORKDIR /usr/app/devault

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]