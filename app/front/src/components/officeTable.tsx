import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface OfficeDataRow {
  building: string;
  floor: string;
  office: string;
  temperature: number;
  humidity: number;
}

const OfficeTable: React.FC = () => {
  const [data, setData] = useState<OfficeDataRow[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/get_buildings_data")
      .then(res => res.json())
      .then((json) => {
        const parsed: OfficeDataRow[] = [];
        console.log("Fetched data:", json);

        for (const [building, floors] of Object.entries(json)) {
          for (const [floor, offices] of Object.entries(floors as object)) {
            for (const [office, metrics] of Object.entries(offices as object)) {
              const { temp, humidity } = metrics as { temp: number; humidity: number };
              parsed.push({
                building,
                floor,
                office,
                temperature: temp,
                humidity: humidity,
              });
            }
          }
        }
        
        setData(parsed);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const columns: TableColumn<OfficeDataRow>[] = [
    { name: "Building", selector: row => row.building, sortable: true },
    { name: "Floor", selector: row => row.floor, sortable: true },
    { name: "Office", selector: row => row.office, sortable: true },
    { name: "Temperature (°C)", selector: row => row.temperature, sortable: true },
    { name: "Humidity (%)", selector: row => row.humidity, sortable: true },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Office Climate Table</h2>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default OfficeTable;
