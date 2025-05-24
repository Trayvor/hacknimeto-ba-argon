import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

export default function Dashboard({ data }) {
  return (
    <div>
      <h2>Live Data</h2>
      <div style={{ display:'flex', gap:20 }}>
        {['temp','humidity','co2'].map(key => (
          <LineChart
            key={key}
            width={300}
            height={200}
            data={data}
          >
            <XAxis dataKey="time" tick={false} />
            <YAxis domain={['auto','auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={key} stroke="#8884d8" dot={false} />
          </LineChart>
        ))}
      </div>
      <div style={{ marginTop:20 }}>
        {data.length>0 && (
          <>
            <p>Window: <b>{data[data.length-1].window?'Open':'Closed'}</b></p>
            <p>HVAC: <b>{data[data.length-1].hvac}</b></p>
          </>
        )}
      </div>
    </div>
  )
}
