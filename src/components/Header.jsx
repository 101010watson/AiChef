import chefIcon from '../assets/chef-icon.png'

export default function Header({ theme, onToggleTheme }) {
    const nextTheme = theme === "light" ? "dark" : "light"

    return (
        <header className="site-header">
            <nav className="topbar" aria-label="Main navigation">
                <a className="brand" href="/" aria-label="Let-AI-Cook home">
                    <img src={chefIcon} alt="" />
                    <span>Let-AI-Cook</span>
                </a>
                <button
                    className="theme-toggle"
                    type="button"
                    onClick={onToggleTheme}
                    aria-label={`Switch to ${nextTheme} mode`}
                    title={`Switch to ${nextTheme} mode`}
                >
                    {theme === "light" ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 3v2m0 14v2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42M3 12h2m14 0h2M5.64 18.36l1.42-1.42m9.88-9.88 1.42-1.42M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" />
                        </svg>
                    )}
                    <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
                </button>
            </nav>
        </header>
    )
}