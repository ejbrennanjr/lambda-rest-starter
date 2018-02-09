FROM awscli

# Reference the following for how I reconfigured npm in this dockerfile 
# https://docs.npmjs.com/getting-started/fixing-npm-permissions

# Reference the following re: mounting -v /var/run/docker.sock:/var/run/docker.sock
# https://medium.com/lucjuggery/about-var-run-docker-sock-3bfd276e12fd
# https://raesene.github.io/blog/2016/03/06/The-Dangers-Of-Docker.sock/


RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node


# commands needed to install nodejs and npm
RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - && \
    apt-get update && \
    apt-get install -y nodejs

RUN apt-get update && apt-get install nano

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER node
RUN mkdir ~/.npm-global \
    && mkdir ~/app 

WORKDIR /home/node/app

# Build
# docker build -f .docker/node9.awscli.dockerfile -t node9-awscli .

# Run
# docker run -p 3000:3000 -v $(PWD):/home/node/app node9-awscli