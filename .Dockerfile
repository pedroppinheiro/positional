FROM gitpod/workspace-full-vnc
RUN apt-get update \
    && apt-get install -y libgtk-3-dev \
    && apt-get install -y libnss3-dev
