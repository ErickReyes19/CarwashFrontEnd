# Usamos la imagen oficial de Node.js como base
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de tu proyecto al contenedor
COPY . .

# Eliminar node_modules anteriores (si existen) y reinstalar las dependencias
RUN rm -rf node_modules && npm install

# Construir el proyecto Next.js
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar el servidor de Next.js en producción
CMD ["npm", "start"]
