FROM jekyll/jekyll:3.3.1
COPY . /srv/jekyll
WORKDIR /srv/jekyll
RUN gem install bundler -v 1.12
RUN bundle _1.12_ install
ENTRYPOINT [ "/bin/bash" ]