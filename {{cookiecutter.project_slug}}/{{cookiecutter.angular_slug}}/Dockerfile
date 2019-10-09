FROM node

WORKDIR /{{cookiecutter.angular_slug}}

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

ENV PATH /{{cookiecutter.angular_slug}}/node_modules/.bin:$PATH

RUN npm install -g @angular/cli

COPY . .

RUN npm install

EXPOSE 4200

CMD ng serve --host 0.0.0.0 --disable-host-check --public-host crypto-app.bubtaylor.com
