FROM node:14.10.1
WORKDIR /app
RUN apt-get update -y
RUN apt-get -y install rsync --allow-unauthenticated
