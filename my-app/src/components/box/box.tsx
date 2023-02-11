import React from 'react'
import './box.css'

interface props{
  image?:string;
  number :number;
}
 
export default function Box({number,image}:props){
  if(number % 2 ===0){
    return <div className='box black-box'>
      <img src={image} alt="" />
    </div>
  }else{
    return <div className='box white-box'>
      {""}
      <img src={image} alt="" />
    </div>
  }
}