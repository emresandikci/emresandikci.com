FROM node:22-alpine AS build
WORKDIR /app

ENV HUSKY=0

COPY package.json pnpm-lock.yaml .npmrc ./

RUN corepack enable && corepack prepare --activate

RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm build

FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

COPY package.json pnpm-lock.yaml .npmrc ./
RUN corepack enable && corepack prepare --activate \
  && pnpm install --prod --frozen-lockfile --ignore-scripts \
  && pnpm store prune

COPY --from=build /app/dist ./dist
COPY --from=build /app/server.mjs ./server.mjs
EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1:80/ || exit 1

CMD ["node", "server.mjs"]
