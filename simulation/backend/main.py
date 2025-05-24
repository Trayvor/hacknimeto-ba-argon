import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List, Dict
import time
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

class Settings(BaseModel):
    target_temp: float
    target_humidity: float
    target_co2: float
    outside_temp: float
    outside_humidity: float
    outside_co2: float
    occupancy: str  # "none", "moderate", "high"

state = {
    "temp": 22.0,
    "humidity": 40.0,
    "co2": 500.0,
    "window_open": False,
    "hvac": "off",  # "cooling", "heating", "off"
    "settings": Settings(
        target_temp=22, target_humidity=50, target_co2=800,
        outside_temp=15, outside_humidity=60, outside_co2=400,
        occupancy="none"
    )
}

clients: List[WebSocket] = []

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    try:
        while True:
            data = await ws.receive_text()
            try:
                s = Settings.parse_raw(data)
                state["settings"] = s
                logger.info(f"Received new settings: {s}")
            except Exception as e:
                logger.error(f"Failed to parse settings: {e}")
    except WebSocketDisconnect:
        clients.remove(ws)
        logger.info("WebSocket disconnected")

async def broadcast():
    msg = {
        "time": time.time(),
        "temp": state["temp"],
        "humidity": state["humidity"],
        "co2": state["co2"],
        "window": state["window_open"],
        "hvac": state["hvac"]
    }
    for ws in clients:
        await ws.send_json(msg)

async def simulate():
    while True:
        s = state["settings"]
        rates = {"none": 0, "moderate": 1.5, "high": 3.0}
        state["co2"] += rates[s.occupancy]

        if state["co2"] > s.target_co2:
            state["window_open"] = True
            logger.info("CO2 high: opening window")
        else:
            state["window_open"] = False

        if state["temp"] > s.target_temp + 0.5:
            if s.outside_temp < state["temp"]:
                state["window_open"] = True
                state["hvac"] = "off"
                logger.info("Temp high & outside cooler: opening window")
            else:
                state["hvac"] = "cooling"
                state["window_open"] = False
                logger.info("Temp high & outside warmer: cooling")
        elif state["temp"] < s.target_temp - 0.5:
            if s.outside_temp > state["temp"]:
                state["window_open"] = True
                state["hvac"] = "off"
                logger.info("Temp low & outside warmer: opening window")
            else:
                state["hvac"] = "heating"
                state["window_open"] = False
                logger.info("Temp low & outside colder: heating")
        else:
            state["hvac"] = "off"

        if state["window_open"]:
            state["temp"] += (s.outside_temp - state["temp"]) * 0.1
            state["humidity"] += (s.outside_humidity - state["humidity"]) * 0.1
            state["co2"] += (s.outside_co2 - state["co2"]) * 0.1
        if state["hvac"] == "cooling":
            state["temp"] -= 0.2
            state["humidity"] -= 0.5
        elif state["hvac"] == "heating":
            state["temp"] += 0.2
            state["humidity"] -= 0.3

        state["temp"] = round(state["temp"], 2)
        state["humidity"] = max(0, min(100, round(state["humidity"], 2)))
        state["co2"] = max(0, round(state["co2"], 2))

        logger.debug(f"State updated: T={state['temp']} H={state['humidity']} CO2={state['co2']}")

        await broadcast()
        await asyncio.sleep(1)

@app.on_event("startup")
async def on_startup():
    asyncio.create_task(simulate())
