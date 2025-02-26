# === Etapa de construcción ===
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/.next .next
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "run", "start"]
