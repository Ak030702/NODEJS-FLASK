FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npn install express

RUN npm install



COPY . .

EXPOSE 3000

CMD ["npm","start"]