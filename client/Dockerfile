
FROM arpitgo4/alpine-node:latest

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 81

CMD [ "npm", "start" ]