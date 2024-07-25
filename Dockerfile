# Use a specific Node.js version
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY ./package*.json ./

# A clean installation of dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the project in production mode
RUN npm run build:prod

# Use an Nginx image
FROM nginx:1.26.0-alpine

# Expose the port that Angular serves on
EXPOSE 8080

# Copy the Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy from build
COPY --from=build /app/dist/pokemon_angular/browser /usr/share/nginx/html
