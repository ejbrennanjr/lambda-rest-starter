FROM awscli

# Reference the following for how I reconfigured npm in this dockerfile 
# https://docs.npmjs.com/getting-started/fixing-npm-permissions

# Reference the following re: mounting -v /var/run/docker.sock:/var/run/docker.sock
# https://medium.com/lucjuggery/about-var-run-docker-sock-3bfd276e12fd
# https://raesene.github.io/blog/2016/03/06/The-Dangers-Of-Docker.sock/



# Went away from the below.  Now setting up a common user -- neo.
# User is created in the awscli.dockerfile
# RUN groupadd --gid 1000 node \
#  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node


USER root

# commands needed to install nodejs and npm
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
    apt-get update && \
    apt-get install -y nodejs

USER neo

ENV NPM_CONFIG_PREFIX=/home/neo/.npm-global

RUN mkdir ~/.npm-global \
    && mkdir ~/app 

WORKDIR /home/neo/app

# Build
# docker build -f .docker/node6.awscli.dockerfile -t node6-awscli .

# Run
# docker run -p 3000:3000 -v $(PWD):/home/neo/app node6-awscli