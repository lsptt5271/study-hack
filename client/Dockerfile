FROM node:16.18.0 as builder

WORKDIR /app

COPY ./client/package*.json ./
RUN npm install

COPY ./client ./
RUN npm run build

FROM node:16.18.0 as runner

WORKDIR /usr/local/app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/packages/client/.next/standalone ./
COPY --from=builder /app/packages/client/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]