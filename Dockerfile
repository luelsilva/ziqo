# Usa a imagem Node.js slim para evitar problemas com dependências nativas no build
FROM node:20-slim AS builder

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de manifesto para instalar dependências
COPY package.json package-lock.json ./

# Instala todas as dependências, necessárias para o build
RUN npm ci

# Copia o restante do código da aplicação
COPY . .

# Variável para evitar limite de memória no Node durante o build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Executa o build do SvelteKit
RUN npm run build

# Remove dependências de desenvolvimento, mantendo apenas as de produção
RUN npm ci --omit=dev

# Estágio de produção
FROM node:20-slim

WORKDIR /app

# Copia o package.json e os arquivos essenciais do estágio "builder"
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# O SvelteKit usando adapter-node expõe a aplicação por padrão na porta 3000
EXPOSE 3000

# Variáveis de ambiente úteis
ENV PORT=3000
ENV NODE_ENV=production

# Comando para iniciar o servidor Node gerado pelo SvelteKit
CMD ["node", "build/index.js"]
