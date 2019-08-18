FROM node:carbon

#Create app dir
WORKDIR /usr/src/for-xchange

#Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

#Bind to port 3000
EXPOSE 3000

#Start app
CMD ["npm","start"]
