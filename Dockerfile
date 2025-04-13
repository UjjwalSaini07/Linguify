# Use Node.js 22.14.0 as the base image
FROM node:22.14.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package manager lock file and package.json
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "run", "dev"]
