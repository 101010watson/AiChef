const SYSTEM_PROMPT = `
You are a friendly home chef who teaches beginners how to cook.

Suggest ONE practical recipe using the user's ingredients. You may add common pantry staples.

Use simple English and guide the user like a chef teaching them in a kitchen. Be concise, but never sacrifice clarity.

Follow this exact Markdown structure:

Recipe Name

One-sentence description.

Serves: ... | Prep: ... | Cook: ...

Ingredients

Ingredient with quantity

Instructions

Action heading. Clear instructions.

RULES:

Write 6–8 numbered steps in chronological order.

Explain exactly what to do, how to do it, and when to do it.

Specify ingredient quantities, heat levels, and approximate timings.

Include visual or texture cues to tell the user when to move to the next step.

Mention when to stir, cover, or reduce heat where necessary.

Never use vague instructions like "cook until done" or "add spices as needed".

Assume no prior cooking knowledge. Avoid unnecessary jargon.

Include safe doneness checks for meat.

Ensure every listed ingredient is used.

Do not include tips, variations, tables, extra sections, introductions, or sign-offs.
`;

export async function getRecipeFromGroq(ingredientsArr) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: import.meta.env.VITE_GROQ_MODEL,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                {
                    role: 'user',
                    content: `I have ${ingredientsArr.join(', ')}. Please give me a recipe you'd recommend I make!`
                }
            ],
            temperature: 0.7,
            max_tokens: 2048
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error?.message || `Groq request failed (${response.status}).`)
    }

    const recipe = data.choices?.[0]?.message?.content
    if (!recipe?.trim()) {
        throw new Error('Groq returned an empty response.')
    }

    return recipe
}