import ReactMarkdown from 'react-markdown'

export default function AiRecipe({ recipeShown, isLoading, error, response }) {
    if (!recipeShown) return null

    return (
        <div className="ai-recipe">
            <section
                className="suggested-recipe-container"
                aria-live="polite"
                aria-busy={isLoading}
            >
                {isLoading ? (
                    <p className="recipe-status">Preparing your recipe...</p>
                ) : error ? (
                    <p className="recipe-error" role="alert">{error}</p>
                ) : (
                    <ReactMarkdown>{response}</ReactMarkdown>
                )}
            </section>
        </div>
    )
}