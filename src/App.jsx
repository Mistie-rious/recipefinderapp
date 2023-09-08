import { useEffect, useState } from 'react'

import './App.css'
import Recipe from './Recipe'
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';


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
      <div className=' bg-background text-center w-full min-h-screen max-h-fit'>
      <div className=' flex items-center flex-col' >
        <h1 className='font-bold text-3xl my-5  mb-9'>Recipe Finder App</h1>
        <form onSubmit={searchRecipe} >
          <div className='flex mb-6'>
          <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder='Search...'
          className='border rounded-sm px-7 py-2 w-full ' >
          </input>
          <button type='submit' className='bg-rose-200 py-2 px-6 hover:bg-rose-300 transition ease-in-out duration-300 delay-200'  >Search</button>
          </div>
        </form>
        </div>
  
        {error ? (
  <div>Error: Something went wrong while fetching recipes.</div>
) : (
  <div className="flex flex-wrap items-center justify-around">
    {recipes.map((recipe) => (
      <div key={recipe.recipe.url} className="bg-white py-5 items-center  rounded-xl px-5 w-1/2 md:w-1/3 h-50 mb-3 mr-2 flex flex-wrap">
        <Recipe search={search} searchRecipe={searchRecipe}
          title={recipe.recipe.label}
          image={recipe.recipe.image}
          calories={recipe.recipe.calories}
          link={recipe.recipe.url}
          ingredients={recipe.recipe.ingredients.map((ingredient) => (
            <li key={ingredient.foodID}>{ingredient.text}</li>
          ))}
        />
      </div>
    ))}
  </div>
)}
    </div>



    </>
  )
}

export default App
