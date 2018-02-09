FROM node:latest

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN apt-get update && apt-get install nano

USER node
RUN mkdir ~/.npm-global \
    && mkdir ~/app \
    && npm install -g aws-sam-local

WORKDIR /home/node/app

COPY package.json .

RUN npm install

VOLUME ["/home/node/app", "/home/node/app/node_modules"]

EXPOSE 3000

CMD ["npm", "start"]



# Build
# docker build -f .docker/serverless.node.awscli.dockerfile -t serverless-node-awscli .

# Run
# docker run --rm -p 3000:3000 -v $(PWD):/var/www serverless-node-awscli