# Strapi v5 CMS — production image.
# Build:  docker build -t 340-cms ./cms
# Or via the repo-root docker-compose.yml (recommended).
# Debian slim, not alpine: the Vite admin build is known to balloon in memory
# under musl's allocator (OOM kills on small build machines), and sharp /
# better-sqlite3 ship glibc prebuilts (no native compile needed).
FROM node:20-bookworm-slim

# Toolchain fallback for native modules without a matching prebuilt
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# patches/ must be present BEFORE npm install: the postinstall hook
# (patch-package) applies the plugin security patches at install time.
COPY package.json package-lock.json ./
COPY patches ./patches
RUN npm install && npm cache clean --force

COPY . .

ENV NODE_ENV=production
# Bounded heap: keeps the admin build from tripping the OOM killer on small
# build machines (forces GC instead of ballooning past available memory).
RUN NODE_OPTIONS="--max-old-space-size=3072" npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
