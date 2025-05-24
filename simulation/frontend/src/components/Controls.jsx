import React, { useState } from 'react'

export default function Controls({ onSave }) {
  const [form, setForm] = useState({
    target_temp: 22, target_humidity:50, target_co2:800,
    outside_temp:15, outside_humidity:60, outside_co2:400,
    occupancy:'none'
  })

  const handle = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name==='occupancy'? value : parseFloat(value) }))
  }

  return (
    <div style={{ marginBottom:20 }}>
      <h2>Settings</h2>
      {[
        ['target_temp','Target Temp (°C)'],['target_humidity','Target Humidity (%)'],
        ['target_co2','Target CO₂ (ppm)'],['outside_temp','Outside Temp (°C)'],
        ['outside_humidity','Outside Humidity (%)'],['outside_co2','Outside CO₂ (ppm)']
      ].map(([k,label])=>(
        <div key={k}>
          <label>{label}: </label>
          <input type="number" name={k} value={form[k]} onChange={handle} />
        </div>
      ))}
      <div>
        <label>Occupancy: </label>
        <select name="occupancy" value={form.occupancy} onChange={handle}>
          <option value="none">None</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>
      <button onClick={()=>onSave(form)} style={{ marginTop:10 }}>Apply</button>
    </div>
  )
}
