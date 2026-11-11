export default function IngredientsList(props){
    
    const ingredientsList = props.ingredients.map(ing => <li name="ing" key={ing}>{ing} 
                                                    <button 
                                                    className="ingredient-remove"
                                                    onClick={()=> props.remIng(ing)}>
                                                        x
                                                    </button></li>)

    return(
        <section className="pantry-section" aria-labelledby="ingredients-title">
            <div className="section-heading">
                <div>
                    <h2 id="ingredients-title">Your ingredients</h2>
                    <p>Keep track of what’s ready to cook.</p>
                </div>
                {ingredientsList.length > 0 && (
                    <span className="ingredient-count">
                        {ingredientsList.length} {ingredientsList.length === 1 ? "item" : "items"}
                    </span>
                )}
            </div>
            {ingredientsList.length === 0 ? <p className='add-atleast'>Your ingredient list is empty. Add your first ingredient above to get started.</p>:
            <div className="ingredients-list">
                <ul>
                    {ingredientsList}
                    
                </ul>
            </div>}
            {ingredientsList.length > 2 &&
            <div className="get-recipe">
                <div className="get-recipe-text">
                    {!props.recipeShown ? 
                        <>
                            <h2>Ready for a recipe?</h2>
                            <p>Generate a recipe from your list of ingredients</p>
                        </>:
                        <>
                            <h2>Ready for a new recipe?</h2>
                            <p>Generate another recipe by adding or removing ingredients</p>
                        </>
                         
                    }
                </div>
                <button onClick={props.onClick} disabled={props.isLoading}>
                    {props.isLoading ? 'Generating...' : 'Get a recipe'}
                </button>
            </div>}
        </section>
    )
}