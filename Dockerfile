###################################################################
# This is multistage Dockerfile, to reduce output container sizes #
# and reduce information disclosure risks.                        #
# https://docs.docker.com/develop/develop-images/multistage-build #
###################################################################

##################################################################
# Define the builder stage. This will be used to build the code. #
##################################################################
FROM node:20-alpine AS builder

# Use an arbitrary but fixed directory to build our app.
WORKDIR /build

# Copy everything from our repository into the Docker file.
# Note: files excluded in .dockerignore will not be copied.
COPY . .

# Use "npm ci" rather than "npm install". This is faster and stricter than "install",
# and will fail the build if the lock file is not up to date.
# https://docs.npmjs.com/cli/v6/commands/npm-ci
#
# After installation, build the application.
RUN --mount=type=secret,id=GITHUB_PACKAGES_AUTH_TOKEN GITHUB_PACKAGES_AUTH_TOKEN=$(cat /run/secrets/GITHUB_PACKAGES_AUTH_TOKEN) npm ci && npm run build

#############################################################################################
# Define the runtime stage. This will be the container that's used for running the service. #
#############################################################################################
FROM node:20-alpine

# Set our environment variables for the runtime environment
ENV NODE_ENV=production
ENV PORT=80

# Use an arbitrary but fixed directory to house our app.
WORKDIR /app

# Let Docker know which ports our service will listen on
EXPOSE ${PORT}

# Copy everything from our repository into the Docker file.
#
# It is essential that certain files, like package.json and next.config.js
# are copied into the runtime container. To avoid missing files, copy everything.
# Sensitive files are excluded in .dockerignore.
COPY . .

# Copy required files from the builder into the runtime container
COPY --from=builder /build/.next/ ./.next

# Use "npm ci" rather than "npm install". This is faster and stricter than "install",
# and will fail the build if the lock file is not up to date.
# https://docs.npmjs.com/cli/v6/commands/npm-ci
#
# After installation, delete our custom .npmrc which will otherwise error at start-up
# as the build tokens will not be available.
RUN --mount=type=secret,id=GITHUB_PACKAGES_AUTH_TOKEN GITHUB_PACKAGES_AUTH_TOKEN=$(cat /run/secrets/GITHUB_PACKAGES_AUTH_TOKEN) npm ci && rm .npmrc

# Use a custom entrypoint script, which allows us to run multiple commands,
# or edit files at container start-up.
ENTRYPOINT ["sh", "./ops/docker-entrypoint.sh"]
