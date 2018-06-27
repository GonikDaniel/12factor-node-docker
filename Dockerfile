FROM mhart/alpine-node
WORKDIR /srv
COPY . .
# redirect all stdout to our log file
RUN ln -sf /dev/stdout /debug.log
RUN mkdir uploads
RUN yarn install --production
EXPOSE 8080
CMD [ "node", "index.js" ]
