FROM node:22-alpine AS build
WORKDIR /app

ENV HUSKY=0

COPY package.json pnpm-lock.yaml .npmrc ./

RUN corepack enable && corepack prepare --activate

RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm build

FROM node:22-alpine

RUN npm install -g serve@14
COPY --from=build /app/build /app/www
EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1:80/ || exit 1

CMD ["serve", "-s", "/app/www", "-l", "80"]
