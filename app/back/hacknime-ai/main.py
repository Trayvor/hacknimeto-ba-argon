from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware  # ← добавляем CORS
from contextlib import asynccontextmanager
import random
from datetime import datetime
from enum import Enum
import json
from fastapi.responses import JSONResponse

# Глобальные переменные
startup_current_consumption = {}
startup_consumption_history = []
startup_insights = []

# Категории и предложения
class ConsumptionCategory(str, Enum):
    ELECTRICITY = "electricity"
    WATER = "water"
    HEATING = "heating"

SUGGESTIONS = {
    ConsumptionCategory.HEATING: [
        "Use programmable thermostats",
        "Lower thermostat at night",
        "Close doors to unused rooms",
        "Open windows less"
    ],
    ConsumptionCategory.ELECTRICITY: [
        "Turn off devices when not in use",
        "Use LED lighting",
        "Unplug idle equipment",
        "Enable power-saving modes"
    ],
    ConsumptionCategory.WATER: [
        "Fix leaking taps",
        "Install low-flow fixtures",
        "Close taps promptly",
        "Limit faucet use during cleaning"
    ]
}

# Генерация данных
def generate_current_consumption():
    return {
        "electricity": random.randint(100, 500),
        "water": random.randint(500, 2000),
        "heating": random.randint(50, 300)
    }

def generate_consumption_history():
    current_month = datetime.now().month
    months = ["January", "February", "March", "April", "May",
              "June", "July", "August", "September", "October",
              "November", "December"]

    history = []
    for i in range(5):
        month_idx = (current_month - i - 2) % 12
        history.append({
            "month": months[month_idx],
            "electricity": round(random.uniform(800, 2000), 1),
            "water": round(random.uniform(300, 1000), 1),
            "heating": round(random.uniform(400, 1500), 1)
        })
    return history[::-1]

def generate_insights():
    num_insights = random.randint(1, 3)
    categories = random.sample(list(ConsumptionCategory), num_insights)
    insights = []
    for category in categories:
        savings = random.randint(50, 300)
        suggestion = random.choice(SUGGESTIONS[category])
        message = f"Your {category.value} usage is higher than expected. You could save €{savings} by {suggestion.lower()}."
        insights.append(message)
    return insights

# Lifespan — заменяет on_event
@asynccontextmanager
async def lifespan(app: FastAPI):
    global startup_current_consumption, startup_consumption_history, startup_insights
    startup_current_consumption = generate_current_consumption()
    startup_consumption_history = generate_consumption_history()
    startup_insights = generate_insights()
    print("Startup data generated.")
    yield

app = FastAPI(lifespan=lifespan)

# Добавляем CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://192.168.2.236:5173"],  # ← твой фронт
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/current")
async def get_current_consumption():
    return startup_current_consumption

@app.get("/history")
async def get_consumption_history():
    return startup_consumption_history

@app.get("/insights")
async def get_insights():
    return startup_insights

@app.get("/get_buildings_data")
async def get_buildings_data():
    try:
        with open("buildings_data.json", "r", encoding="utf-8") as file:
            data = json.load(file)
        return JSONResponse(content=data)
    except FileNotFoundError:
        return JSONResponse(status_code=404, content={"error": "File not found"})

@app.get("/get_buildings")
async def get_buildings():
        return {
            "Building 1",
            "Sky Tower",
            "Riverfront Plaza",
            "Central Park"
        }

