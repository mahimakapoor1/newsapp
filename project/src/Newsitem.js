import React from 'react'
import './newsitem.css'
export default function Newsitem(props) {

  return (
    <div className='components'>
      <img src={props.image} alt="..." />
      <h2>{props.heading}</h2>
      <p>{props.description}</p>
      <a href={props.link} target="_blank" rel="noopener noreferrer" >
        Read More
      </a>
    </div>
  )
}
