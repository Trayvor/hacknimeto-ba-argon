# Backend API Documentation

## 1. Home Page

### GET /rooms

**Endpoint**: `/rooms`  
**Method**: `GET`  
**Description**: Fetches data for all rooms, including their current status, percentage change over the last 3 hours, and the associated chart data.

#### Response Example:

```json
[
    {
        "name": "Caprica",
        "percentageChange": "-12.00%",
        "chartData": [
            { "time": "02:00", "value": 75 },
            { "time": "03:00", "value": 80 },
            { "time": "04:00", "value": 70 }
        ]
    },
    {
        "name": "Vendor",
        "percentageChange": "5.00%",
        "chartData": [
            { "time": "02:00", "value": 72 },
            { "time": "03:00", "value": 74 },
            { "time": "04:00", "value": 77 }
        ]
    }
]
```

### Fields:

-   `name` (string): The name of the room (e.g., "Caprica").
-   `percentageChange` (string): The percentage change in value (calculated based on the last 3 hours). Format: `value.00%` (e.g., `-12.00%`).
-   `chartData` (array): An array of data points representing the chart for the last 3 hours.
    -   Each data point has:
        -   `time` (string): The time of the data point (e.g., "02:00").
        -   `value` (number): The value at the given time (e.g., `75`).

### Notes:

-   **Percentage Change**: Calculated based on the value change over the last 3 hours.
-   **Chart Data**: Contains 3 data points, representing the values at 3 different times in the last 3 hours.

## 2. Room Page

### GET /room

**Endpoint**: `/room`  
**Method**: `GET`  
**Description**: Fetches detailed room data based on the provided time period (`from` and `to`).

#### Request Parameters:

-   `from` (string, required): The start date and time of the range (ISO 8601 format).
-   `to` (string, required): The end date and time of the range (ISO 8601 format).

#### Example Request:

```json
{
    "room": "Vendor",
    "from": "2025-01-10T00:00:00Z",
    "to": "2025-01-10T12:00:00Z"
}
```

#### Response Example:

```json
{
    "name": "Vendor",
    "temperature": "22°C",
    "co2": "450 ppm",
    "humidity": "50%",
    "noise": "35 dB",
    "light": "300 lux",
    "progressData": [
        {
            "id": "uuid1",
            "label": "Mon",
            "value": 59,
            "timeData": [
                { "label": "1:00", "value": 50 },
                { "label": "2:00", "value": 60 },
                { "label": "3:00", "value": 55 }
            ]
        },
        {
            "id": "uuid2",
            "label": "Tue",
            "value": 61,
            "timeData": [
                { "label": "1:00", "value": 40 },
                { "label": "2:00", "value": 45 }
            ]
        }
    ],
    "conditionsData": [
        { "label": "Temperature", "value": 22, "fullMark": 50 },
        { "label": "CO2 Level", "value": 450, "fullMark": 1000 },
        { "label": "Light Level", "value": 300, "fullMark": 1000 },
        { "label": "Noise Level", "value": 35, "fullMark": 100 },
        { "label": "Humidity", "value": 50, "fullMark": 100 }
    ]
}
```

### Fields

-   `name` (string)

-   The name of the room (e.g., "Vendor").

-   `temperature` (string)

-   The current temperature at the time of the response, in degrees Celsius (e.g., "22°C").

-   `co2` (string)

-   The current CO2 level at the time of the response, measured in ppm (e.g., "450 ppm").

-   `humidity` (string)

-   The current humidity level at the time of the response, represented as a percentage (e.g., "50%").

-   `noise` (string)

-   The current noise level at the time of the response, measured in decibels (e.g., "35 dB").

-   `light` (string)

-   The current light intensity at the time of the response, measured in lux (e.g., "300 lux").

---

#### `progressData` (array)

A list representing the progress or status of the room for each day (or other time intervals). Each entry includes detailed time-based data points.

##### Each entry contains:

-   **`id`** (string): A unique identifier for the progress data entry (e.g., `"uuid1"`).
-   **`label`** (string): The label representing the date or time interval (e.g., `"Mon"`, `"Tue"`).
-   **`value`** (number): The associated value for the given day or interval (e.g., `59` for Monday).
-   **`timeData`** (array): A list of time-based data points for the day.

##### Each `timeData` entry contains:

-   **`label`** (string): The time of the data point (e.g., `"1:00"`, `"2:00"`).
-   **`value`** (number): The value recorded at that specific time (e.g., `50`).

---

#### `conditionsData` (array)

A list of environmental conditions or metrics, summarized over a selected period of time.

##### Each entry contains:

-   **`label`** (string): The name of the condition (e.g., "Temperature", "CO2 Level").
-   **`value`** (number): The average or representative value for the condition during the selected time period (e.g., 22 for temperature).
-   **`fullMark`** (number): The maximum possible or ideal value for the condition, used for scaling (e.g., 50 for temperature, 1000 for CO2 Level).
