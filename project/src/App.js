import React, { useState,useEffect } from 'react'
import Newsitem from './Newsitem'
import './App.css'
export default function App() {
  const [news,setnews]=useState([])
  const [search,setsearch]=useState('')
  const [nowpage,setnowpage] =useState(1)
  const [totalpage,settotalpage]=useState(1)
  
  const getNews = async () => {
    let url = await fetch(`https://newsapi.org/v2/everything?q=${search}&from=2023-05-29&sortBy=publishedAt&apiKey=f4239de238d6409eaea7efb8ce9aba0e&pagesize=12&page=${nowpage}`)
    let jsonData = await url.json();
    setnews(jsonData.articles);
    if (jsonData.articles) {
      settotalpage(Math.ceil(jsonData.totalResults / 12));
    }
  };

  useEffect(() => {
    getNews();
  }, [search, nowpage]);
  const handlesubmit=(e)=>{
    e.preventDefault()
    setnowpage(1)
    getNews()
  }
  const handleprev=()=>{
    if(nowpage>1)
    setnowpage(nowpage-1)
  }
  const handlenext=()=>{
    if(nowpage<totalpage)
    setnowpage(nowpage+1)
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
            <Newsitem image={item.urlToImage}
            heading={item.title ? item.title.slice(0, 25) : ''}
            description={item.description ? item.description.slice(0, 110) : ''}
            link={item.url} />
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




