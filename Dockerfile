# Etapa 1: build
FROM node:20-alpine AS build

WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

RUN npm install

# Copia todo o projeto
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: servidor web
FROM nginx:alpine

# Remove arquivos default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia build da etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração customizada do nginx, se quiser
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
