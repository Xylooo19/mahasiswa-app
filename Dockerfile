# Gunakan base image Node.js
FROM node:18

# Buat working directory
WORKDIR /app

# 
COPY package*.json ./
RUN npm install

# 
COPY . .

# Jalankan server
CMD ["node", "server.js"]
