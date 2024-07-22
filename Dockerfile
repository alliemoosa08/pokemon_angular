# Use a specific Node.js version
FROM node:18-alpine

# Create a non-root user
RUN addgroup -S app && adduser -S -G app app

# Set the working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install Angular CLI and project dependencies
RUN npm install -g @angular/cli && npm install

# Copy the rest of the application
COPY . .

# Change to non-root user
USER app

# Expose the port that Angular serves on
EXPOSE 4200

# Start the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0"]
