# v-web-cw-frontend/Dockerfile
FROM node:20-alpine AS build

WORKDIR /app

# 1. Копируем package файлы
COPY package.json package-lock.json ./

# 2. Удаляем node_modules если есть и устанавливаем ВСЕ зависимости
RUN rm -rf node_modules && \
    npm ci --include=dev --no-audit --prefer-offline

# 3. Копируем исходный код
COPY . .

# 4. Даем права на node_modules/.bin
RUN chmod -R +x node_modules/.bin/

# 5. Собираем проект
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
