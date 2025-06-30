# Stage 1: Build the app with PNPM
FROM node:20-alpine AS builder

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy only package manager files first for caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy rest of the project
COPY . .

# Build the app
RUN pnpm build

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine AS production

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom SPA routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
