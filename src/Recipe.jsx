import React from 'react'

function Recipe({title, image, calories, ingredients}) {
  return (
    <div>
    <div >
        <h1 className='font-bold'>{title}</h1>
        <p>{calories}</p>
        <img src={image} alt=''></img>
        <p>{ingredients}</p>
    </div>
    </div>
  )
}

export default Recipe