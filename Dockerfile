FROM node:8.0.0

ADD package.json webpack.config.babel.js /SourceUndead/
ADD . /SourceUndead

WORKDIR /SourceUndead

RUN npm install --unsafe-perm && npm install babel-cli -g && npm run build
