# Create node image
FROM node:16.4-alpine3.14

# specific the workdir
WORKDIR /app

# copy files to WORKDIR
COPY . /app

# rm unused
RUN npm prune --production --silent \
    && rm Dockerfile .dockerignore

# Expose port 9010
EXPOSE 9010

# run command
CMD [ "node", "index.js" ]