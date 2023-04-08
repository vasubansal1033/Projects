# Use a Node.js LTS version as the base image
FROM node:lts-alpine

# Create the app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the app directory
COPY package*.json ./

# Install the app dependencies
RUN npm install --legacy-peer-deps

# Copy the app source code to the app directory
COPY . .

# Build the app for production
# RUN npm run build

# Set the environment variable to production
ENV NODE_ENV=production

# Expose the port that the app will run on
EXPOSE 3000

# # Start the app
# CMD ["npm", "run", "start"]
