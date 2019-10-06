"""Setup configuration and dependencies for the Crypto Logger."""

import codecs
import os
import setuptools
import re

here = os.path.abspath(os.path.dirname(__file__))

COMMANDS = []

PACKAGES = setuptools.find_packages(
    exclude=["*tests*", "test_*.py"]
    )

REQUIREMENTS = REQUIREMENTS = [requirement for requirement in open('requirements.txt').readlines()]

setuptools.setup(
    name='{{cookiecutter.project_name}}-backend',
    version="0.0.0",
    description='{{cookiecutter.project_description}}',
    packages=PACKAGES,
    python_requires='>=3.6.8',
    entry_points={'console_scripts': COMMANDS},
    install_requires=REQUIREMENTS,
)
