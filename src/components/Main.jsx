import {useState, useEffect,useRef} from 'react'
import IngredientsList from './sub-comp/IngredientsList'
import AiRecipe from './sub-comp/AiRecipe'
import { getRecipeFromGemini } from '../../ai'
import { Behavior } from '@google/genai'

export default function Main(){
    const [ingredients, setIngredients] = useState([])

    function addIng(formData){
        const value = formData.get('ingredient')
        if (typeof value !== 'string') return // checks if the retrieved value is text
        
        const newIng = value.trim()
        if(!newIng) return // ignores empty input or input containing only spaces

        setIngredients(prevIng =>
        prevIng.some(ing => ing.toLowerCase() === newIng.toLowerCase())
            ? prevIng
            : [...prevIng, newIng]
        )

        /*
            Checks whether any existing ingredient matches the new one. 
            Converting both to lowercase makes the comparison case-insensitive, 
            so "Chicken" and "chicken" count as duplicates.
        */
        
    }

    function remIng(ingToRemove){
        setIngredients(prevIng => prevIng.filter(ing => ing!==ingToRemove))
    }

    
    const [recipeShown,setRecipeShown] = useState(false)
    const [response, setResponse] = useState('')
    const recipeSection = useRef(null)
    useEffect(()=>{
        (recipeShown && recipeSection.current != null) && recipeSection.scrollIntoView({behavior:'smooth'})
    },[response])
    
    // handle the error response throught Gemini API 
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    async function toggleRecipe(){
        setRecipeShown(true)
        setIsLoading(true)
        setError('')
        setResponse('')
        try {
            const recipe = await getRecipeFromGemini(ingredients)
            if (!recipe?.trim()) throw new Error('Gemini returned an empty response.')
            setResponse(recipe)
        } catch (err) {
            console.error('Unable to generate recipe:', err)
            setError(err instanceof Error ? err.message : 'Unable to generate a recipe.')
        } finally {
            setIsLoading(false)
        }
    }
    return(
        <main className="page-content">
            <section className="ingredient-section" aria-labelledby="intro-title">
                <div className="intro">
                    <span className="eyebrow">YOUR KITCHEN, YOUR RULES</span>
                    <h1 id="intro-title">What ingredients do you have?</h1>
                    <p>Add what’s in your kitchen and let AI dream up something delicious.</p>
                </div>
                <form action={addIng} className="ingredient-form">
                <input 
                type="text" 
                placeholder="Try chicken, spinach, rice..." 
                name='ingredient'
                aria-label="Ingredient to add"
                />
                    <button type="submit"><span aria-hidden="true">+</span> Add ingredient</button>
                </form>
            </section>

            <IngredientsList
                ingredients={ingredients}
                onClick={toggleRecipe}
                isLoading={isLoading}
                remIng={remIng}
                recipeShown={recipeShown}
                ref={recipeSection}
            />

            <AiRecipe response={response} recipeShown={recipeShown} isLoading={isLoading} error={error}/>
            
        </main>
    )
}

// Note: Explanation of how this thing is working
/*

1. We shoudl use React state to manage dynamic data.
We shouldn't directly modify state using methods like push().
Instead, we create a new array and update it using the
setter function by react

2. We use the spread operator(...prevIng) to copy existing elements 
into the new array and append the new ingredient

3. we give input elements a name attribute so that
FormData can identify and retrieve their values using
the getter function

*/