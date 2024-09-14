FROM hub.yottab.io/library/node:16.20.0-alpine

RUN mkdir /app
ADD . /app

WORKDIR /app
RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]
