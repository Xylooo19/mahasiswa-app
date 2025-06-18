# Gunakan base image Node.js
FROM node:18

# Buat working directory
WORKDIR /app

# Salin dependency dan install
COPY package*.json ./
RUN npm install

# Salin seluruh project ke dalam container
COPY . .

# Jalankan server
CMD ["node", "server.js"]
