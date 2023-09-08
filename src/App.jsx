import { useEffect, useState } from 'react'

import './App.css'
import Recipe from './Recipe'
import { v4 as uuidv4 } from 'uuid';


function App() {
  uuidv4(); 
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] =useState("") 
  const [error, setError] = useState(false)


  
  const APPKEY = "a49970ad1b1dbbc095c9e3e71a5189ab"
  const APPID = "2dde9c65"


    useEffect(() => {
      getRecipe();
    }, [query])

    const getRecipe = async () => {
    try{
       const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APPID}&app_key=${APPKEY}`)

      const data = await response.json()
      setRecipes(data.hits)
      console.log(data.hits)
    }
    catch(error){
      setError(true)
    }
    }

    const searchRecipe = (e) => {
      e.preventDefault();
      setQuery(search)
      setSearch("")
    }


    
  
  return (
    <>
      <div className=' bg-background flex  justify-center align-middle min-h-screen max-h-fit'>
        <div className=' flex flex-col' >
        <h1 className='font-bold text-3xl  mb-9'>Recipe Finder App</h1>
        <form onSubmit={searchRecipe} >
          <div className='flex '>
          <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder='Search...'
          className='border rounded-sm mr-2 px-7 py-2 w-full ' >
          </input>
          <button type='submit' className='bg-rose-200 py-2 px-6 hover:bg-white transition ease-in-out delay-200'  >Search</button>
          </div>
        </form>
   
      { error? (
        <div>hiii</div>
      ): (
      recipes.map(recipe => (
        <div className='bg-white w-fit h-fit mb-4 flex flex-wrap'>
        <Recipe key={uuidv4()} 
        title={recipe.recipe.label} 
        image={recipe.recipe.image} 
        calories={recipe.recipe.calories}
        ingredients= {recipe.recipe.ingredients.map(ingredient => (
          <div key={uuidv4()} >{ingredient.text}</div>
        ))} />
        </div>
      ))
 
       )
    }
       </div>
      </div>
    </>
  )
}

export default App
