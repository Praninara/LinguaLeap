# Use an official Node.js image
FROM node:18

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy everything else
COPY . . 

CMD ["npm", "start"]
