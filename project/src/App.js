import React, { useState } from 'react'
import Newsitem from './Newsitem'
import './App.css'
export default function App() {
  const [news,setnews]=useState([])
  const [search,setsearch]=useState('')
  const [nowpage,setnowpage] =useState(1)
  const [totalpage,settotalpage]=useState(1)
    const getnews=async()=>{
        var url=await fetch(`https://newsapi.org/v2/everything?q=${search}&from=2023-05-28&sortBy=publishedAt&apiKey=78a81cb15a1e4a709a3b3f0a98af26aa&pageSize=12&page=${nowpage}`)
        var data=await url.json()
        setnews(data.articles)
        if(data.articles)
        settotalpage(Math.ceil(data.totalResults)/12)
    }

  const handlesubmit=(e)=>{
    e.preventDefault();
    setnowpage(1);
    getnews()
  }
  const handleprev=()=>{
    if(nowpage>1)
    setnowpage(nowpage-1)
    getnews()
  }
  const handlenext=()=>{
    if(nowpage<totalpage)
    setnowpage(nowpage+1)
    getnews()
  }
  return (
    <div className='container'>
      <h1>NEWS APP</h1>
      <form onSubmit={handlesubmit}>
        <input  className='search' type='text' placeholder='what to search...' value={search} onChange={(e)=>setsearch(e.target.value)}/>
        <input type='submit' value="submit" className='button'/>
      </form>
      <div className='main'>
      {news &&(
        news.map((item,index)=>{
          return(<div key={index} className='newsitem' >
            <Newsitem image={item.urlToImage} heading={item.title.slice(0,25)} description={item.description.slice(0,110)} link={item.url} />
          </div>
          )
        })
      )}
      </div>
      <div>
      <button className="button" onClick={handleprev}>prev</button>
     <span className="current-page">{nowpage}</span>
      <button className="button" onClick={handlenext}>next</button>
      </div>
    </div>
  )
}


