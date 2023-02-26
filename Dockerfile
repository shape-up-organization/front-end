FROM node:18-alpine AS base

FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm ci

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

ARG NEXT_PUBLIC_DOCKER
ENV NEXT_PUBLIC_DOCKER=${NEXT_PUBLIC_DOCKER}
ARG NEXT_PUBLIC_LOCAL
ENV NEXT_PUBLIC_LOCAL=${NEXT_PUBLIC_LOCAL}

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG NEXT_PUBLIC_DOCKER
ENV NEXT_PUBLIC_DOCKER=${NEXT_PUBLIC_DOCKER}
ARG NEXT_PUBLIC_LOCAL
ENV NEXT_PUBLIC_LOCAL=${NEXT_PUBLIC_LOCAL}

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]
