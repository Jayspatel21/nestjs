# Stage 1: Build the application
FROM node:18.18.0-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy all files and build the application
COPY . .
RUN yarn build

# Stage 2: Run the application
FROM node:18.18.0-alpine

WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.env ./.env
RUN yarn install --production

# Expose the application port
EXPOSE 1400

# Set the command to run the application
CMD ["node", "dist/main"]
