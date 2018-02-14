FROM ubuntu:14.04

# groff, less = needed by aws-cli help command
# zip, unzip = needed for lambda code upload
# python 3.4 = needed for aws-cli in general
RUN apt-get update && \
    apt-get install -y groff less zip unzip curl python3.4 nano

# Create the user neo and everything is going forward is going to run and be 
# hosted in its directory
RUN groupadd --gid 1000 neo \
  && useradd --uid 1000 --gid neo --shell /bin/bash --create-home neo

USER neo
WORKDIR /home/neo

# path needed to aws-cli
ENV PATH "/home/neo/.local/bin:$PATH"

# pip = python package manager needed for aws-cli
RUN curl -O https://bootstrap.pypa.io/get-pip.py && \
    python3 get-pip.py --user 

# install awscli through pip package manager
RUN pip install awscli --upgrade --user


# Build
# docker build -f .docker/awscli.dockerfile -t awscli .

# Run
# docker run --env-file .secrets/secrets.env awscli 

# Connect to Bash
# docker run -it --env-file .secrets/secrets.env awscli /bin/bash   

# Connect to running container
# docker exec -it <Running Container Id> /bin/bash