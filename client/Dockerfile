# Use official Node.js image as base
FROM node:18 AS build
# Set the working directory in the container
WORKDIR /usr/src/app
# Copy package.json and yarn.lock to the working directory
COPY package.json package-lock.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build
# Use Nginx for serving the static files
FROM nginx:alpine
# Copy built files from previous stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]