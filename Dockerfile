FROM node:10.3

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

# Bundle app source
RUN mkdir db;

COPY dist dist
COPY server server
COPY common common

RUN ls -lah

CMD [ "npm", "start" ]

