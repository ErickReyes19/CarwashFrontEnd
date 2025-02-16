# -------------------------------
# Etapa 1: Compilación (builder)
# -------------------------------
    FROM node:20-alpine AS builder

    # Establecer el directorio de trabajo
    WORKDIR /app
    
    # Copiar únicamente los archivos de dependencias para aprovechar la caché
    COPY package*.json ./
    
    # Instalar todas las dependencias (usamos npm ci si tienes package-lock.json)
    RUN npm ci
    
    # Copiar el resto de los archivos del proyecto
    # (Asegúrate de que tu .dockerignore no excluya archivos necesarios, como tsconfig.json)
    COPY . .
    
    # Compilar la aplicación Next.js
    RUN npm run build
    
    # Opcional: Verificar que la carpeta .next fue creada
    RUN ls -alh .next
    
    # -------------------------------
    # Etapa 2: Producción (runner)
    # -------------------------------
    FROM node:20-alpine AS runner
    
    # Establecer el directorio de trabajo
    WORKDIR /app
    
    # Configurar la variable de entorno a producción
    ENV NODE_ENV=production
    
    # Copiar solo lo necesario desde la etapa builder
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    # Si usas archivos de configuración adicionales (por ejemplo, next.config.js), cópialos también:
    # COPY --from=builder /app/next.config.js ./
    
    # Exponer el puerto en el que corre la aplicación
    EXPOSE 3000
    
    # Comando para ejecutar la aplicación en producción
    CMD ["npm", "run", "start"]
    