FROM node:20.5-alpine3.17

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --immutable
# RUN npm install react-scripts@3.4.1 -g

# add app
COPY . ./

EXPOSE 8001
# start app
CMD ["npm", "run","dev"]