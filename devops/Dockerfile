# Build Stage
FROM node:18 as BUILD
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build
RUN npm rebuild bcrypt --build-from-source

# Production Stage
FROM node:18-alpine
WORKDIR /app
COPY --from=BUILD /app /app
EXPOSE 8080
CMD ["yarn", "start"]
