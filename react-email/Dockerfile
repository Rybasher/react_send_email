FROM node:latest

WORKDIR /app

COPY package.json .
RUN yarn
RUN yarn add react-text-mask
COPY . .

EXPOSE 3000
CMD ["yarn", "start"]