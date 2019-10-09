FROM python:3.7
WORKDIR /{{cookiecutter.python_slug}}/
ADD requirements.txt .
RUN pip install -r requirements.txt

ADD . .
RUN pip install .

EXPOSE 8000

CMD uvicorn {{cookiecutter.python_slug}}:app --host='0.0.0.0' --port=8000
