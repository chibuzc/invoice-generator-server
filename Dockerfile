FROM node:16-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

# move ormconfig.docker.json to docker as ormconfig.json
# typeorm always watches for ormconfig.json
COPY ormconfig.docker.json ./ormconfig.json
COPY .env .

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh && \
    ln -s usr/local/bin/docker-entrypoint.sh / # backwards compat

ENTRYPOINT ["sh","docker-entrypoint.sh"]

EXPOSE 3000
CMD ["npm", "start"]