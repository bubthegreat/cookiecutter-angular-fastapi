from {{cookiecutter.project_name}}_backend.app import app


import logging

logger = logging.getLogger('{{cookiecutter.project_name}}_backend')
logger.setLevel(logging.INFO)
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

