FROM node:20-lts

RUN apt update && apt install curl

RUN npm -v

RUN npm i @google/clasp -g
