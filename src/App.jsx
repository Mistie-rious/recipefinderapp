import { useEffect, useState } from 'react'

import './App.css'
import Recipe from './Recipe'

function App() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] =useState("") 


  
  const APPKEY = "a49970ad1b1dbbc095c9e3e71a5189ab"
  const APPID = "2dde9c65"


    useEffect(() => {
      getRecipe();
    }, [query])

    const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APPID}&app_key=${APPKEY}`)
      const data = await response.json()
      setRecipes(data.hits)
      console.log(data.hits)
    }
    const searchRecipe = (e) => {
      e.preventDefault();
      setQuery(search)
      setSearch("")
    }


    
  
  return (
    <>
      <div className=''>
        
        <form onSubmit={searchRecipe} >
          <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          type='text'  
          className='border text-slate-400' >
          </input>
          <button type='submit'  >Search</button>
        </form>
      </div>
      {recipes.map(recipe => (
        <div>
        <Recipe key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        image={recipe.recipe.image} 
        calories={recipe.recipe.calories}
        ingredients= {recipe.recipe.ingredients.map(ingredient => (
          <div>{ingredient.text}</div>
        ))} />
        </div>
      ))}

    </>
  )
}

export default App
