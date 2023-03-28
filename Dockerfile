# Use an official Node runtime as a parent image
FROM node:12.22.1

# Create a new user to run the container
RUN useradd --user-group --create-home --shell /bin/false appuser

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any necessary dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Set the user to run the container
USER appuser

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["node", "./index.js"]