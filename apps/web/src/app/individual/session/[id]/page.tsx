'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function Session() {
  const p = useParams(), r = useRouter()
  const [s, setS] = useState<any>(null)
  const [c, setC] = useState<any[]>([])
  const [h, setH] = useState('')
  const [rc, setRc] = useState(0)
  
  useEffect(() => { load() }, [])
  
  const load = async () => {
    const res = await fetch(`http://localhost:3001/v1/sessions/${p.id}`)
    const {data} = await res.json()
    setS(data)
    setH(data.houseMode === 'strict' ? 'Hôm nay tao mệt. Có 3 gợi ý thôi.' : 'Hôm nay tao dễ tính.')
    loadC()
  }
  
  const loadC = async () => {
    const res = await fetch(`http://localhost:3001/v1/sessions/${p.id}/candidates`)
    const {data} = await res.json()
    setC(data)
  }
  
  const reroll = async () => {
    const res = await fetch(`http://localhost:3001/v1/sessions/${p.id}/reroll`, {method:'POST'})
    const {data} = await res.json()
    
    if (data.takeover) {
      alert('House takeover!')
      r.push(`/result/${p.id}`)
      return
    }
    
    const n = rc + 1
    setRc(n)
    
    if (s.houseMode === 'strict') {
      if (n === 1) setH('Còn 2 lần.')
      if (n === 2) setH('Còn 1 lần cuối.')
    } else {
      if (n === 4) setH('Khó chiều thế.')
      if (n === 7) setH('Mày định ăn không vậy???')
    }
    
    setC(data)
  }
  
  if (!s) return <div>Loading...</div>
  
  return (
    <div style={{padding:40,maxWidth:600,margin:'auto'}}>
      <div style={{background:'#f0f0f0',padding:20,borderRadius:8,marginBottom:24}}>
        <strong>🏠 The House:</strong> {h}
      </div>
      
      {s.houseMode === 'strict' && (
        <div style={{marginBottom:16,color:'#666'}}>Còn lại: {3-rc}</div>
      )}
      
      {c.length > 0 && (
        <div style={{border:'1px solid #ddd',padding:20,borderRadius:8,marginBottom:24}}>
          <div style={{width:'100%',height:200,background:'#e0e0e0',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'center'}}>
            📍 (photo)
          </div>
          <h2>{c[0].name}</h2>
          <p>{c[0].address}</p>
          <p>⭐ {c[0].rating}</p>
        </div>
      )}
      
      <div style={{display:'flex',gap:16}}>
        <button onClick={() => r.push(`/result/${p.id}`)} style={{flex:1,padding:16,fontSize:16,cursor:'pointer',background:'#4CAF50',color:'white',border:'none'}}>
          ✓ Accept
        </button>
        <button onClick={reroll} style={{flex:1,padding:16,fontSize:16,cursor:'pointer'}}>
          🔄 Reroll
        </button>
      </div>
    </div>
  )
}