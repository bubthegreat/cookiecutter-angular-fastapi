"""Setup configuration and dependencies for {{cookiecutter.python_slug}}."""

from setuptools import find_packages
from setuptools import setup


REQUIREMENTS = [requirement for requirement in open("requirements.txt").readlines()]

COMMANDS = [
    "example_command={{cookiecutter.python_slug}}.tools.example:main",
    "start_api_server={{cookiecutter.python_slug}}.app:main",
]

setup(
    name="{{cookiecutter.python_slug}}",
    version="0.0.0.alpha0",
    author="{{cookiecutter.author}}",
    author_email="{{cookiecutter.author_email}}",
    url="{{cookiecutter.url}}",
    include_package_data=True,
    description="{{cookiecutter.project_description}}",
    packages=find_packages('src'),
    package_dir={
        '': 'src',
    },
    python_requires=">=3.6.6",
    entry_points={"console_scripts": COMMANDS},
    install_requires=REQUIREMENTS,
)
