FROM node:carbon as init-build

#Create app dir
WORKDIR /app

# Bundle app source
COPY . ./

#Install app dependencies
COPY package*.json ./
RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=init-build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
