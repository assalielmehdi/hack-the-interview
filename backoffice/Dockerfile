FROM node:slim as BUILD_STAGE
WORKDIR /backoffice
ENV REACT_APP_API_BASE_URL=http://localhost:8080
COPY ./package*.json  ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM httpd:alpine
COPY --from=BUILD_STAGE /backoffice/build/ /usr/local/apache2/htdocs/