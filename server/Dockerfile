FROM node:18-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci \
  && npm install --global nodemon

COPY . .

CMD ["npm", "run", "server"]