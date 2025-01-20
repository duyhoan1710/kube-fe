# Use an official Node.js runtime as the base image
FROM node:22-alpine AS build

# Set the working directory
WORKDIR kube-fe

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server for production
FROM nginx:alpine

# Copy the React app build to the Nginx HTML directory
COPY --from=build /kube-fe/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
