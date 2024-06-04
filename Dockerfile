FROM node:lts-alpine as builder

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM nginx 
ARG NGINX_SERVER_NAME
ENV NGINX_SERVER_NAME $NGINX_SERVER_NAME
# Copy nginx config files to container
COPY nginx-files/nginx-selfsigned.crt /etc/ssl/certs/nginx-selfsigned.crt
COPY nginx-files/nginx-selfsigned.key /etc/ssl/private/nginx-selfsigned.key
COPY nginx-files/ssl-params.conf /etc/nginx/ssl/ssl-params.conf
COPY nginx-files/nginx.conf /etc/nginx/templates/default.conf.template

# Copy html to container
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Copy sw and manifests to src
RUN mkdir /usr/share/nginx/html/src
COPY ./sw.js /usr/share/nginx/html/sw.js
COPY src/manifest.json /usr/share/nginx/html/src/manifest.json
COPY src/assets/logo512.png /usr/share/nginx/html/src/assets/logo512.png