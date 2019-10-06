# {{ cookiecutter.project_name }}

This is a cookie cutter template created from https://github.com/bubthegreat/cookiecutter-angular-fastapi for an angular frontend and a FastAPI backend!  Basic instructions are below for running your dev locally to get up and
running!  Examples for services and API calls are still in progress!


## Angular Frontend

### Installing the frontend

```
PS C:\Users\bubth\Development\test\test1> cd .\test1-frontend\
PS C:\Users\bubth\Development\test\test1\test1-frontend> npm install . 
```

### Running the frontend

To run the frontend, you'll run the command:

`ng serve`

from the frontend directory.  If you navigate to http://localhost:4200 you should see a generic welcome page!

## FastAPI Backend

Our API backend is FastAPI, which does automatic swagger docs for you!  Swagger docs will be available at http://localhost:8000/docs when running on your localhost so you can see what they look like.

### Installing the backend

```
(venv) PS C:\Users\bubth\Development\test\test1\test1-frontend> cd ..\test1_backend\
(venv) PS C:\Users\bubth\Development\test\test1\test1_backend> python -m venv venv
(venv) PS C:\Users\bubth\Development\test\test1\test1_backend> .\venv\Scripts\Activate.ps1
(venv) PS C:\Users\bubth\Development\test\test1\test1_backend> pip install .
Processing c:\users\bubth\development\test\test1\test1_backend

    *** SNIP INSTALLATION ***

(venv) PS C:\Users\bubth\Development\test\test1\test1_backend>
```

### Running the backend

To run the backend API, you should be able to run the app.py:

```
(venv) PS C:\Users\bubth\Development\test\test1\test1_backend> python .\test1_backend\app.py
INFO: Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO: Started reloader process [11436]
INFO: Started server process [2248]
INFO: Waiting for application startup.
```

If you navigate to http://localhost:8000/status you should get something similar to this:

`{"status":"UP","uptime":"52s","server_time":"2019-10-05 23:27:54.505806"}`
