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
EXPOSE 5173

# Start the frontend development server
CMD ["npm", "run", "dev", "--", "--host"]