FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3334

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /app/prisma/seed.cjs ./seed.cjs
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/fly.toml ./fly.toml

EXPOSE 3334

CMD ["sh", "-c", "npx prisma generate && npx prisma db push --skip-generate && node seed.cjs && node_modules/.bin/next start --port 3334"]
