#1. Imagen base con Node
FROM node:20

#Directorio de trabajo
WORKDIR /app

#3. Copiar package.json y package-lock.json
COPY package*.json ./

#4. Instalar dependencia
RUN npm install

#5. Copiar el resto de los archivos del proyecto
COPY . .

#6. Exponer el puerto
EXPOSE 8080

#7. Comando para iniciar el servidor
CMD [ "node", "src/server.js" ]