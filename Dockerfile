# Use Node.js official image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend code into the container
COPY ./backend /app/backend

# Expose the port (handled by docker-compose)
EXPOSE 5000

# Default command (overridden by docker-compose)
CMD ["node", "backend/server1.js"]
