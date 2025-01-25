# Usamos la imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de tu proyecto al contenedor
COPY . .

# Instalar las dependencias del proyecto
RUN npm install

# Construir el proyecto Next.js
RUN npm run build

# Exponer el puerto 8082
EXPOSE 8082

# Comando para ejecutar el servidor de Next.js en producción
CMD ["npm", "start"]
