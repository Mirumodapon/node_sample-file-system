FROM node:16.14.0-alpine3.14
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5001
ENTRYPOINT ["npm", "start"]
