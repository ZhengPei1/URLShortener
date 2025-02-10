FROM alpine:3.20
WORKDIR /url_shortener_server

# install dependencies
COPY package.json .
RUN npm install

COPY . . 

EXPOSE 5000
CMD ["node", "run", "start"]
