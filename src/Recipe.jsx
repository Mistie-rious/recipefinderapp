import React from 'react'

function Recipe({title, image, calories, ingredients, link}) {
  return (
    <div>
    <div >
        <h1 className='font-bold'>{title}</h1>
        <p>{calories} calories</p>
        <img src={image} alt=''></img>
        <div className='font-bold'>Ingredient List  </div>
          <div>{ingredients}</div>
        
        <a className='text-pink-300' href={link} target="_blank">Click here for recipe</a>
    </div>
    </div>
  )
}

export default Recipe