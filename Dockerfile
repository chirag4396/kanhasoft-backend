FROM node:14.15.4-alpine

RUN mkdir -p /usr/src/backend

WORKDIR /usr/src/backend

COPY package.json /usr/src/backend

RUN npm install

COPY . /usr/src/backend

EXPOSE 3000

CMD ["npm", "run", "start:dev"]