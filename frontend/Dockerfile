# 1. Node.js imajını kullan
FROM node:20-alpine

WORKDIR /app

# 2. Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# 3. Kodu kopyala
COPY . .

# 4. Vite'ı dışarıya açık şekilde çalıştır
CMD ["npm", "run", "dev", "--", "--host"]