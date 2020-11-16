FROM node:14.15.0-alpine as builder

COPY . /ice-and-fire-wiki
WORKDIR /ice-and-fire-wiki


# install app dependencies
COPY package.json ./
COPY package-lock.json ./

ENV NODE_ENV production
ENV GENERATE_SOURCEMAP=false

RUN npm install

RUN npm run build -- --profile

FROM nginx:1.19.0-alpine

COPY --from=builder /ice-and-fire-wiki/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf docker-entrypoint.d/

RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
chown -R nginx:nginx /var/cache/nginx && \
chown -R nginx:nginx /var/log/nginx && \
chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
chown -R nginx:nginx /var/run/nginx.pid

USER nginx
EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]