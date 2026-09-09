'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Individual() {
  const r = useRouter()
  const [l, setL] = useState(false)
  
  const start = async () => {
    setL(true)
    const a = await fetch('http://localhost:3001/v1/auth/guest', {method: 'POST'})
    const {data: auth} = await a.json()
    localStorage.setItem('userId', auth.userId)
    
    const s = await fetch('http://localhost:3001/v1/sessions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({mode: 'individual', userId: auth.userId})
    })
    const {data: sess} = await s.json()
    
    await fetch(`http://localhost:3001/v1/sessions/${sess.id}/context`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        location: {lat: 21.028, lng: 105.852},
        distancePref: 'normal',
        budget: 'mid',
        timeOfDay: 'lunch'
      })
    })
    
    r.push(`/individual/session/${sess.id}`)
  }
  
  return (
    <div style={{padding:40,maxWidth:600,margin:'auto'}}>
      <h1>Individual Mode</h1>
      <p>Tìm quán cho một người</p>
      <button onClick={start} disabled={l} style={{marginTop:32,padding:20,fontSize:18,cursor:'pointer'}}>
        {l ? 'Loading...' : 'Bắt đầu'}
      </button>
    </div>
  )
}