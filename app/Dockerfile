FROM node:16

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm i
COPY ./server.js ./common/ ./

CMD ["npm","start"]