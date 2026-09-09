# Multi-stage build for UCC-MCA Intelligence Platform
# Every stage inherits the same Node/npm toolchain as dependency acceptance CI.
FROM node:24.19.0-alpine AS node-base
RUN apk add --no-cache libc6-compat
RUN npm install --global npm@11.9.0 --ignore-scripts --no-audit --no-fund

# Copy the complete workspace manifest graph before either frozen installation.
FROM node-base AS manifests
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/desktop/package.json ./apps/desktop/package.json
COPY apps/mobile/package.json ./apps/mobile/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/core/package.json ./packages/core/package.json
COPY packages/ui/package.json ./packages/ui/package.json

# Stage 1: All dependencies (including dev tooling for the build).
FROM manifests AS deps
RUN npm ci --ignore-scripts --no-audit --no-fund

# Stage 1b: Production dependencies; no development hooks or browser downloads.
FROM manifests AS prod-deps
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund

# Stage 2: Builder
FROM node-base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps ./apps
COPY --from=deps /app/packages ./packages
COPY . .

# Set build-time environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build frontend + server bundle
RUN npm run build:render

# Stage 3: Production runner
FROM node-base AS runner
WORKDIR /app

# Browser provisioning is explicit; npm lifecycle downloads stay disabled.
RUN apk add --no-cache chromium && test -x /usr/bin/chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Security: Run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy only production dependencies (no dev tooling ships to the runtime image)
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/apps ./apps
COPY --from=prod-deps /app/packages ./packages

# Copy built application (frontend dist + server bundle)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Copy database migrations and scripts
COPY --from=builder /app/database ./database
COPY --from=builder /app/scripts/migrate.ts ./scripts/

# Change ownership to non-root user
RUN chown -R appuser:nodejs /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the server (esbuild bundle)
CMD ["node", "dist/server.cjs"]
