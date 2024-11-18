# Use Node.js 16 as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for caching npm install layer
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3006 (as defined in docker-compose.yml)
EXPOSE 3006

# Start the application (ensure npm start is defined in package.json)
CMD ["npm", "start"]
