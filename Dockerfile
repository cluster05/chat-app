# Alpine is chosen for its small footprint
# compared to Ubuntu
FROM node:14-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

# expose vuejs default application port
EXPOSE 8080

# run simple http-server 
CMD [ "http-server dist -p 8080" ]