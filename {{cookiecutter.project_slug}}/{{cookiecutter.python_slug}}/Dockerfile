FROM python:3.7
WORKDIR /{{cookiecutter.python_slug}}/
ADD requirements.txt .
RUN pip install -r requirements.txt

ADD . .
RUN pip install .

EXPOSE {{cookiecutter.api_port}}

CMD start_api_server
