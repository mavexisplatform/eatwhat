'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function Result() {
  const p = useParams()
  const [s, setS] = useState<any>(null)
  const [cd, setCd] = useState(5)
  
  useEffect(() => { load() }, [])
  useEffect(() => {
    if (cd > 0) {
      const t = setTimeout(() => setCd(cd - 1), 1000)
      return () => clearTimeout(t)
    } else nav()
  }, [cd])
  
  const load = async () => {
    const res = await fetch(`http://localhost:3001/v1/sessions/${p.id}`)
    const {data} = await res.json()
    setS(data)
  }
  
  const nav = () => {
    if (s?.candidates?.[0]) {
      const r = s.candidates[0]
      window.open(`https://maps.google.com/?daddr=${r.lat},${r.lng}`, '_blank')
    }
  }
  
  if (!s) return <div>Loading...</div>
  const rest = s.candidates?.[0]
  
  return (
    <div style={{padding:40,maxWidth:600,margin:'auto'}}>
      <div style={{background:'#4CAF50',color:'white',padding:20,borderRadius:8,marginBottom:24,textAlign:'center'}}>
        <h2>🎉 Final Decision</h2>
        {s.houseOverride && <p>House chốt!</p>}
      </div>
      
      {rest && (
        <div style={{border:'2px solid #4CAF50',padding:20,borderRadius:8,marginBottom:24}}>
          <h1>{rest.name}</h1>
          <p>{rest.address}</p>
          <p>⭐ {rest.rating}</p>
        </div>
      )}
      
      <div style={{textAlign:'center',fontSize:48,marginBottom:16}}>{cd}</div>
      
      <button onClick={() => setCd(0)} style={{width:'100%',padding:20,fontSize:18,cursor:'pointer',background:'#2196F3',color:'white',border:'none'}}>
        Navigate Now
      </button>
      
      <button onClick={() => setCd(999)} style={{width:'100%',marginTop:16,padding:16,fontSize:16,cursor:'pointer'}}>
        Cancel
      </button>
    </div>
  )
}