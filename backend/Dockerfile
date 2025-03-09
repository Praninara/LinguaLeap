# Use Node.js official image
FROM node:18

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5001

# Start the backend server
CMD ["node", "backend/server.js"]