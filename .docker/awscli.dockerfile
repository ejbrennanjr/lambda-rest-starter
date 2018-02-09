FROM ubuntu:14.04

# path needed to aws-cli
ENV PATH "/root/.local/bin:$PATH"

# groff, less = needed by aws-cli help command
# zip, unzip = needed for lambda code upload
# python 3.4 = needed for aws-cli in general
RUN apt-get update && \
    apt-get install -y groff less zip unzip curl python3.4


# pip = python package manager needed for aws-cli
RUN curl -O https://bootstrap.pypa.io/get-pip.py && \
    python3 get-pip.py --user 


# install awscli through pip package manager
RUN pip install awscli --upgrade --user





# Build
# docker build -f .docker/awscli.dockerfile -t awscli .

# Run
# docker run --env-file .secrets/secrets.env -v $(PWD):/var/www awscli    