# Use Node.js official image
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json from the root directory
COPY ../package.json ../package-lock.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY . .

# Expose the port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
