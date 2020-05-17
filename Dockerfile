FROM node:12.13.1-alpine3.9

LABEL MAINTAINER BELAYET HOSSAIN
LABEL EMAIL soyket.handymama@gmail.com
LABEL VERSION 1.0

WORKDIR /opt/app

RUN apk update && apk add yarn
RUN yarn global add nodemon

COPY package.json .
RUN yarn

COPY . .

