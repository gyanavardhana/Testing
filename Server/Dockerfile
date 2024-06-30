# Use a Node.js base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the port on which your backend application runs
EXPOSE 3000

# Command to start the development server
CMD ["npm", "run", "start"]
