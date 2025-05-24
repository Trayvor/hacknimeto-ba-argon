FROM node:18-alpine AS builder

WORKDIR /app

# Копіюємо package.json + lock (опціонально)
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо ВСІ файли (включно з public/index.html)
COPY . .

# Збираємо продакшн білд
RUN npm run build

# Статичний сервінг на базі nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
