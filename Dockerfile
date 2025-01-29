FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on npm only
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application 
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy files from the builder stage 
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public


EXPOSE 3003

# Set environment variables for the app
ENV PORT=3003
ENV HOSTNAME="0.0.0.0"


CMD ["node", "server.js"]