# Usamos la imagen oficial de Node.js como base
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el resto del código al contenedor
COPY . .

# Construir el proyecto Next.js
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar el servidor de Next.js en producción
CMD ["npm", "start"]
