# syntax=docker/dockerfile:1

# ---- Build stage: compile the Vite SPA into static assets ----
FROM node:20-slim AS build
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# ---- Runtime stage: serve the built app on $PORT ----
FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY --from=build /app/dist ./dist
COPY server.js ./
EXPOSE 8080
CMD ["node", "server.js"]
