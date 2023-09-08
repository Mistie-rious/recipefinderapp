import React from 'react'

function Recipe({title, image, calories, ingredients}) {
  return (
    <div>
        <h1>{title}</h1>
        <p>{calories}</p>
        <img src={image} alt=''></img>
        <p>{ingredients}</p>
    </div>
  )
}

export default Recipe