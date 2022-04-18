FROM node:14.5.0-alpine
WORKDIR /usr/src/app

RUN npm install 
RUN npm install react-scripts
RUN npm install react-router-dom@5
RUN npm install moment
RUN npm install styled-components
RUN npm install use-file-upload