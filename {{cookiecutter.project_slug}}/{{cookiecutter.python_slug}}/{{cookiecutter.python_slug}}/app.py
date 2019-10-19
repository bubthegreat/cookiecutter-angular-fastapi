"""Main app for {{cookiecutter.python_slug}}."""

import asyncio
import datetime
import logging
import time

from concurrent.futures import ThreadPoolExecutor

import redis
import uvicorn

from fastapi import FastAPI
from starlette.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"], expose_headers=["*"])
logger = logging.getLogger(__name__)
REDIS = redis.Redis(host='{{ cookiecutter.redis_hostname }}', port=6379, db=0)
POOL_EXECUTOR = ThreadPoolExecutor(max_workers=10)
START_TIME = time.time()


@app.on_event("startup")
async def startup():
    """Perform startup activities."""
    # If you have any startup activities that need to be defined,
    # define them here.
    logger.info("Started application.")


@app.on_event("shutdown")
async def shutdown():
    """Perform shutdown activities."""
    # If you have any shutdown activities that need to be defined,
    # define them here.
    logger.info("Application has shut down.")


@app.get("/redis")
async def return_key(key: str) -> str:
    """Get value of a key from the redis store.

    :param key: Key that you want the value from.

    :return result: Value from the redis key store.
    
    """
    redis_future = POOL_EXECUTOR.submit(REDIS.get, key)
    result = await asyncio.wrap_future(redis_future)
    return result


@app.post("/redis")
async def set_key(key: str, value: str) -> bool:
    """Set value of a key in the redis store.

    :param key: Key taht you want to set.
    :param value: Value that you want to set the key to.

    :return result: Bool indicating success or failure.
    """
    redis_future = POOL_EXECUTOR.submit(REDIS.set, *(key, value))
    result = await asyncio.wrap_future(redis_future)
    return result


@app.get("/status")
async def return_status() -> JSONResponse:
    """Get basic server status information.

    :returns status_info: JSON response for our status info.
    """
    logger.info("/status endpoint called.")
    status_info = {
        'status': "UP",
        'uptime': f"{time.time() - START_TIME:.0f}s",
        'server_time': str(datetime.datetime.now()),
    }
    return JSONResponse(status_info)


def main():
    """Run through uvicorn when run."""
    uvicorn.run("{{cookiecutter.python_slug}}:app", host='0.0.0.0', port=8000, reload=True)

if __name__ == "__main__":
    main()
