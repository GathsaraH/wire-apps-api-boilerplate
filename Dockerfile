# Use a lightweight base image for the build stage
FROM node:18 AS build

# Set environment variable
ENV DOCKER=1

# Enable corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory
WORKDIR /app

# Accept build arguments
ARG DATABASE_URL

# Set environment variable
ENV DATABASE_URL=$DATABASE_URL

# Copy package.json and pnpm-lock.yaml first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN apt-get update -y && apt-get install -y openssl \
    && pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Use a smaller base image for the final stage
FROM node:18 AS final

# Set environment variable
ENV DOCKER=1

# Enable corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose the port
EXPOSE 5601

# Run the application
CMD ["node", "dist/main.js"]