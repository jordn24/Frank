# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your project files into the container
COPY . .

# Install TypeScript and ts-node globally
RUN npm install -g typescript ts-node

# Run ts-node to start your application
CMD ["ts-node", "index.ts"]
