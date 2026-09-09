'use client'
import { useRouter } from 'next/navigation'
export default function Home() {
  const r = useRouter()
  return (
    <div style={{padding:40,maxWidth:600,margin:'auto'}}>
      <h1>🍜 EatWhat</h1>
      <p>Hôm nay ăn gì?</p>
      <div style={{display:'flex',flexDirection:'column',gap:16,marginTop:32}}>
        <button onClick={() => r.push('/individual')} style={{padding:20,fontSize:18,cursor:'pointer'}}>Individual</button>
        <button style={{padding:20,fontSize:18,opacity:0.5}}>Couple (Soon)</button>
        <button style={{padding:20,fontSize:18,opacity:0.5}}>Group (Soon)</button>
      </div>
    </div>
  )
}