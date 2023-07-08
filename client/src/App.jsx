import { useState } from 'react'
// import 'dotenv/config'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [url, setUrl] = useState("")
  const [count, setCount] = useState(0)

  const postInsightsEndpoint = (import.meta?.env?.VITE_PATH || `http://localhost:${import.meta?.env?.VITE_PORT || "4000"}`) + `/insights`;

  async function handleSubmit(e){
    e.preventDefault();
    // console.log(import.meta.env)
    if(url === "") return;
    let data = await fetch(postInsightsEndpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url})
    })
  }

  return (
    <>
      <h1>Website Word Counter</h1>
      <form onSubmit={handleSubmit} className="">
        <input 
          value={url}
          placeholder="e.g. https://www.example.com" className="insights-input"
          onChange={e => setUrl(e.target.value)}
          type="text"
        />
        <button>
          Get Insights
        </button>
      </form>
    </>
  )
}

export default App
