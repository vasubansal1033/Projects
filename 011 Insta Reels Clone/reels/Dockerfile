# Use an official Node.js runtime as a parent image
FROM node:18.16.0

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the .next build directory to /app
COPY .next /app/.next

# Expose port 3000 for the container
EXPOSE 3000

# Start the app
# CMD ["npm", "start"]