FROM node:16.14-alpine AS build

WORKDIR /adcp-ui
RUN npm i -g npm@8.5.0

# Install base dependencies
COPY . .
RUN npm install

# RUN Build
RUN npm run build


##################################################################################################


FROM nginx:1.18-alpine AS runtime

WORKDIR /app/adcp-ui/build

COPY --from=build /adcp-ui/build .

CMD ["nginx", "-g", "daemon off;"]
