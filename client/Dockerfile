FROM node:alpine

WORKDIR /mauto-web/client

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3001

CMD ["pnpm", "run", "dev"]
