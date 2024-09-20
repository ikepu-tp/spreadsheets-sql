FROM node:20

RUN apt update
RUN apt install curl

RUN npm -v

RUN npm i @google/clasp -g
