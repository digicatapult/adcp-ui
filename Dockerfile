ARG NODE_VERSION=16-alpine
FROM node:$NODE_VERSION AS build

RUN npm -g install npm@8.x.x

WORKDIR /adcp-ui

# Install base dependencies
COPY . .
RUN npm install

# RUN Build
RUN npm run build

##################################################################################################

FROM node:$NODE_VERSION AS runtime

RUN npm -g install npm@8.x.x

WORKDIR /adcp-ui
ENV PORT 3000

COPY --from=build /adcp-ui/build .

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "/adcp-ui"]
