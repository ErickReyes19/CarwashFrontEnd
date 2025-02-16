# 1️⃣ Usamos una imagen base más pequeña para producción
FROM node:20-alpine AS builder

# 2️⃣ Establecemos el directorio de trabajo
WORKDIR /app

# 3️⃣ Copiamos solo package.json y package-lock.json (evita copiar archivos innecesarios)
COPY package*.json ./

# 4️⃣ Instalamos solo dependencias de producción para reducir el tamaño
RUN npm install --only=production

# 5️⃣ Copiamos el código fuente
COPY . .

# 6️⃣ Construimos la aplicación Next.js
RUN npm run build

# -------------------------------------------

# 7️⃣ Usamos una nueva imagen más ligera para el entorno de producción
FROM node:20-alpine AS runner

# 8️⃣ Establecemos el directorio de trabajo
WORKDIR /app

# 9️⃣ Copiamos solo los archivos necesarios desde la imagen `builder`
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 1️⃣0️⃣ Exponemos el puerto 3000
EXPOSE 3000

# 1️⃣1️⃣ Ejecutamos la aplicación en modo producción
CMD ["npm", "run", "start"]
