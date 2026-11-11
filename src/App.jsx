import { useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"

export default function App() {

    // this is a good example of how we use state in the root 
    // and pass down to children using props
    
    const [theme, setTheme] = useState("dark")

    function toggleTheme() {
        setTheme(currentTheme => currentTheme === "light" ? "dark" : "light")
    }

    return (
        <div className="app" data-theme={theme}>
            <Header theme={theme} onToggleTheme={toggleTheme} />
            <Main />
        </div>
    )
}