# Etapa 1: Construção da aplicação
FROM node:20 AS build

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de configuração do projeto para o container
COPY package*.json ./

# Instalando dependências
RUN npm install

# Copiando o restante dos arquivos
COPY . .

# Executando o build da aplicação com webpack
RUN npm run build:webpack


FROM nginx:alpine


COPY nginx.conf /etc/nginx/nginx.conf


COPY --from=build /app/dist/ /usr/share/nginx/html


EXPOSE 90

CMD ["nginx", "-g", "daemon off;"]
