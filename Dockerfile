FROM node:12 as node
FROM ruby:2.7.1

RUN apt-get update -qq \
    && apt-get install -y --no-install-recommends \
                    build-essential \
                    ca-certificates \
                    graphviz \
    && rm -rf /var/lib/apt/lists/*

COPY --from=node /opt/yarn-* /opt/yarn
COPY --from=node /usr/local/bin/node /usr/local/bin/

RUN ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn \
    && ln -s /opt/yarn/bin/yarnpkg /usr/local/bin/yarnpkg

RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo

WORKDIR /usr/src/app
