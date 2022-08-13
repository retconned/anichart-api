FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN rm -rf node_modules && yarn install --frozen-lockfile

RUN npm install -D @types/node

RUN npm install -g typescript

RUN tsc -p .

EXPOSE 8080

CMD ["node", "dist/app.js"]