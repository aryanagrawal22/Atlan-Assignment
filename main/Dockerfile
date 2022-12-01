# Get node from Docker DockerHub
FROM node:12-alpine

# Install Nodemon
RUN npm i -g nodemon

# Make app directory as work directory
RUN mkdir /app

WORKDIR /app

# Copy package files and install in work directory
COPY package.json /app

COPY package-lock.json /app

RUN npm i

COPY . /app

# Expose port 5000
EXPOSE 5000

# Run command
CMD [ "npm", "start" ]