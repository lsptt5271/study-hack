FROM node:16.18.0-slim as builder

WORKDIR /app

COPY ./client/package*.json ./
RUN npm install

COPY ./client ./
RUN npm run build

FROM node:16.18.0-slim as runner

WORKDIR /usr/local/app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]