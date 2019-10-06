"""Main app for {{cookiecutter.project_name}}-backend."""

import asyncio
import datetime
import logging
import time

import uvicorn
from fastapi import FastAPI

from starlette.responses import JSONResponse

from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"], expose_headers=["*"])
logger = logging.getLogger(__name__)
START_TIME = time.time()


@app.on_event("startup")
async def startup():
    """Perform startup activities."""
    # If you have any startup activities that need to be defined,
    # define them here.
    pass

@app.on_event("shutdown")
async def shutdown():
    """Perform shutdown activities."""
    # If you have any shutdown activities that need to be defined,
    # define them here.
    pass


@app.get("/status")
async def return_prices() -> JSONResponse:
    """Get market price for multiple coins.

    :returns status_info: JSON response for our status info.
    """
    status_info = {
        'status': 'UP',
        'uptime': time.time() - START_TIME,
        'server_time': str(datetime.datetime.now()),
    }
    return JSONResponse(status_info)


def main():
    """Run through uvicorn when run."""
    uvicorn.run("{{cookiecutter.project_name}}-backend:app", host='0.0.0.0', port=8000, reload=True)

if __name__ == "__main__":
    main()
