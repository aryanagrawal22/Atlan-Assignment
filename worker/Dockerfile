# Get node from Docker DockerHub
FROM node:12-alpine

# Install Nodemon
RUN npm i -g nodemon

# Make app directory as work directory
RUN mkdir /worker

WORKDIR /worker

# Copy package files and install in work directory
COPY package.json /worker

COPY package-lock.json /worker

RUN npm i

COPY . /worker

# Expose port 8000
EXPOSE 8000

# Run command
CMD [ "npm", "start" ]