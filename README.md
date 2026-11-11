# Let-AI-Cook

Turn the ingredients you already have into a recipe idea. Add items to your kitchen list, then ask Gemini to suggest a recipe using some or all of them.

## Features

- Add and remove ingredients from your list.
- Prevent duplicate ingredients, ignoring letter case.
- Generate a recipe once you have at least three ingredients.
- View the generated recipe as formatted Markdown.
- Switch between light and dark themes.

## Getting started

### Requirements

- Node.js and npm
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### Install and run

1. Clone or download this project and open its directory in a terminal.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env.local` file in the project root and add your API key:

   ```dotenv
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open the local URL printed by Vite in your browser.

Add at least two ingredients to enable **Get a recipe**. The app sends your ingredient list to Gemini and displays the suggested recipe in the page.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run Oxlint on the project. |

## Project structure

```text
├── ai.js                         # Gemini recipe generation
├── index.html                    # HTML entry point
├── src/
│   ├── App.jsx                   # App shell and theme state
│   ├── index.css                 # App styles
│   └── components/
│       ├── Header.jsx            # Branding and theme toggle
│       ├── Main.jsx              # Ingredient and recipe flow
│       └── sub-comp/
│           ├── AiRecipe.jsx      # Generated recipe display
│           └── IngredientsList.jsx
└── vite.config.js
```

## Built with

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Google GenAI SDK](https://ai.google.dev/gemini-api/docs)
- [React Markdown](https://github.com/remarkjs/react-markdown)

## API key safety

The app currently calls Gemini directly from the browser. Vite variables prefixed with `VITE_` are included in client-side code, so **do not use a private or production API key in a publicly deployed client app**. For production, route Gemini requests through a server-side endpoint and keep the key in the server's environment.
