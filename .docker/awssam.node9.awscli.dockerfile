FROM node9-awscli

# AWS-SAM-LOCAL documentation
# https://github.com/awslabs/aws-sam-local

# Reference the following for trouble installing aws-sam-local
# Had trouble installing globally, so made npm changes in node9.awscli.dockerfile
# Still cannot install aws-sam-local in local npm folder
# https://github.com/awslabs/aws-sam-local/issues/66
# https://github.com/awslabs/aws-sam-local/issues/129

USER root

RUN gpasswd -a neo staff

USER neo

RUN npm install -g aws-sam-local

COPY package.json .

RUN npm install

VOLUME ["/home/neo/app", "/home/neo/app/node_modules"]

EXPOSE 3000

CMD ["npm", "start"]

# Build
# docker build -f .docker/awssam.node9.awscli.dockerfile -t awssam-node9-awscli .

# Run
# docker run --rm -p 3000:3000 -v $(PWD):/home/neo/app awssam-node9-awscli