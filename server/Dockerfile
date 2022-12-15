FROM node:16.18.0-alpine

WORKDIR /usr/local/app

COPY ./server/package*.json ./
RUN npm install

COPY ./server ./
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]