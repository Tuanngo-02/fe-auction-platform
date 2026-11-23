# --- Build stage ---
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_APP_API_URL=/api
ARG VITE_APP_NAME
ENV VITE_APP_API_URL=$VITE_APP_API_URL \
    VITE_APP_NAME=$VITE_APP_NAME
RUN npm run build

# --- Runtime stage: static files served by nginx ---
FROM nginx:1.27-alpine
# BACKEND_URL is substituted into the nginx config at container start (nginx templates).
ENV BACKEND_URL=http://backend:8080
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
