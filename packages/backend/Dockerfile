FROM node
WORKDIR /backend

COPY ./package.json ./

RUN yarn install

COPY . .

RUN yarn build
COPY ./ormconfig.docker.json ./ormconfig.json
WORKDIR /dist

EXPOSE 4000
CMD node src/index.js