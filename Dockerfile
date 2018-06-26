FROM mhart/alpine-node
WORKDIR /srv
COPY . .
RUN mkdir uploads
RUN yarn install --production
EXPOSE 8080
CMD [ "node", "index.js" ]
