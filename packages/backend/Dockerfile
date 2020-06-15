FROM node as builder 
WORKDIR /usr/backend

COPY ./package*.json /usr/backend

RUN yarn install
COPY . /usr/backend

COPY ./ormconfig.docker.json /usr/backend/ormconfig.json
COPY .env /usr/backend

EXPOSE 4000
CMD yarn start