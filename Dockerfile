# Use Node.js LTS version with Alpine for security and size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install npm securely - update npm to latest version
RUN npm install -g npm@latest

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (including devDependencies for development)
RUN npm ci && \
    npm audit fix || true

# Copy the rest of the application files
COPY . .

# Expose Vite dev server port
EXPOSE 3000

# Run linting, prettier check, and start dev server
CMD ["sh", "-c", "npm run lint || true && npm run format:check || true && npm run dev -- --host"]
