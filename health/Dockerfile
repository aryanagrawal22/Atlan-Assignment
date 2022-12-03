# Get node from Docker DockerHub
FROM node:12-alpine

# Install Nodemon
RUN npm i -g nodemon

# Make app directory as work directory
RUN mkdir /health

WORKDIR /health

# Copy package files and install in work directory
COPY package.json /health

COPY package-lock.json /health

RUN npm i

COPY . /health

# Expose port 9000
EXPOSE 9000

# Run command
CMD [ "npm", "start" ]