import React, { useState, useEffect, useRef } from 'react'
import Controls from './components/Controls.jsx'
import Dashboard from './components/Dashboard.jsx'

export default function App() {
  const [settings, setSettings] = useState(null)
  const [data, setData] = useState([])
  const ws = useRef(null)

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/ws')
    ws.current.onmessage = e => {
      const msg = JSON.parse(e.data)
      setData(prev => [...prev.slice(-59), msg])
    }
    return () => ws.current.close()
  }, [])

  const sendSettings = s => {
    setSettings(s)
    ws.current.send(JSON.stringify(s))
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Room Climate Simulator</h1>
      <Controls onSave={sendSettings} />
      <Dashboard data={data} />
    </div>
  )
}
