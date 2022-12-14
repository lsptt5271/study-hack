FROM node:16.18.0

WORKDIR /usr/local/app

COPY ./server/package*.json ./
RUN npm install

COPY ./server ./
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]