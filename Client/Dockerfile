# Use Node.js LTS version as base image
FROM node:lts AS development

# Set working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose the port the app runs on (default is 5173 for React)
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev"]
