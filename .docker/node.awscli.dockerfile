FROM awscli

# commands needed to install nodejs and npm
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
    apt-get update && \
    apt-get install -y nodejs

# Build
# docker build -f .docker/node.awscli.dockerfile -t node-awscli .

# Run
# docker run -p 3000:3000 -v $(PWD):/var/www node-awscli