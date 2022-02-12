FROM node:16-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

# move ormconfig.docker.json to docker as ormconfig.json
# typeorm always watches for ormconfig.json
COPY ormconfig.docker.json ./ormconfig.json
COPY .env .

EXPOSE 3000
CMD ["npm", "start"]