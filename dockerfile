# Usamos la imagen oficial de Node.js como base
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir el proyecto Next.js
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar el servidor de Next.js en producción
CMD ["npm", "start"]
