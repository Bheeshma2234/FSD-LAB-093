import { useEffect, useState } from 'react'
import './App.css'

const movies = [
    {
        title: 'Avengers: Doomsday',
        type: 'Marvel event',
        description: "Marvel's next major Avengers adventure.",
        image: 'https://i.abcnewsfe.com/a/0c097b14-4cb4-4ca8-ba88-e770a1d3d4dd/avengers-poster_1766515462943_hpEmbed_2x3.jpg',
        accent: 'red',
    },
    {
        title: 'Dune: Part Three',
        type: 'Epic sci-fi',
        description: 'Return to the sweeping world of Arrakis.',
        image: 'https://cdn.kinocheck.com/i/w%3D1200/ad3cls7zcg.jpg',
        accent: 'gold',
    },
    {
        title: 'Varanasi',
        type: 'Indian cinema',
        description: "S. S. Rajamouli's epic adventure starring Mahesh Babu.",
        image: '/varanasi.jpg',
        accent: 'teal',
    },
]

function App() {
    const [activeMovie, setActiveMovie] = useState(0)
    const [currentPage, setCurrentPage] = useState('home')

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveMovie((current) => (current + 1) % movies.length)
        }, 5000)

        return () => window.clearInterval(timer)
    }, [])

    const selectMovie = (index) => setActiveMovie((index + movies.length) % movies.length)
    const navigateTo = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <main className="movieverse">
            <nav className="navbar" aria-label="Main navigation">
                <a className="brand" href="#top" aria-label="MovieVerse home" onClick={(event) => { event.preventDefault(); navigateTo('home') }}>
                    <span className="brand-mark">MV</span>
                    <span>Movie<span>Verse</span></span>
                </a>
                <div className="nav-links">
                    <a className={currentPage === 'home' ? 'active' : ''} href="#top" onClick={(event) => { event.preventDefault(); navigateTo('home') }}>Home</a>
                    <a className={currentPage === 'movies' ? 'active' : ''} href="#movies" onClick={(event) => { event.preventDefault(); navigateTo('movies') }}>Movies</a>
                    <a className={currentPage === 'about' ? 'active' : ''} href="#about" onClick={(event) => { event.preventDefault(); navigateTo('about') }}>About</a>
                </div>
                <a className="calendar-link" href="#movies" onClick={(event) => { event.preventDefault(); navigateTo('movies') }}><span>●</span> 2026 releases</a>
            </nav>

            {currentPage === 'home' && <section className="hero" id="top" aria-label="Featured movies">
                <div className="hero-image" style={{ backgroundImage: `url(${movies[activeMovie].image})` }} />
                <div className="hero-shade" />
                <div className="hero-content">
                    <p className="eyebrow">Featured premiere · 01 / 03</p>
                    <h1>{movies[activeMovie].title}</h1>
                    <p className="hero-copy">{movies[activeMovie].description}</p>
                    <div className="hero-actions">
                        <a className="button button-light" href="#movies" onClick={(event) => { event.preventDefault(); navigateTo('movies') }}>Explore movies <span>↗</span></a>
                        <button className="button button-ghost" type="button" onClick={() => selectMovie(activeMovie + 1)}>Next feature <span>→</span></button>
                    </div>
                </div>
                <div className="slider-controls">
                    <button type="button" aria-label="Previous featured movie" onClick={() => selectMovie(activeMovie - 1)}>←</button>
                    {movies.map((movie, index) => (
                        <button className={index === activeMovie ? 'dot selected' : 'dot'} key={movie.title} type="button" aria-label={`Show ${movie.title}`} onClick={() => selectMovie(index)} />
                    ))}
                    <button type="button" aria-label="Next featured movie" onClick={() => selectMovie(activeMovie + 1)}>→</button>
                </div>
            </section>}

            {currentPage === 'movies' && <section className="movie-section page-section" id="movies">
                <div className="section-heading">
                    <div><p className="eyebrow dark">Mark your calendar</p><h2>Upcoming <em>movies</em></h2></div>
                    <span className="section-count">03 / now showing</span>
                </div>
                <div className="movie-grid">
                    {movies.map((movie, index) => (
                        <article className="movie-card" key={movie.title}>
                            <div className="poster-wrap"><img src={movie.image} alt={`${movie.title} poster`} /><span className={`movie-tag ${movie.accent}`}>{movie.type}</span><span className="card-number">0{index + 1}</span></div>
                            <div className="card-body"><h3>{movie.title}</h3><p>{movie.description}</p><a href="#about" onClick={(event) => { event.preventDefault(); navigateTo('about') }}>Read more <span>↗</span></a></div>
                        </article>
                    ))}
                </div>
            </section>}

            {currentPage === 'about' && <section className="about page-section" id="about">
                <p className="eyebrow">About MovieVerse</p>
                <h2>Everything<br /><em>about movies.</em></h2>
                <div className="promise-grid">
                    <div><strong>01</strong><h3>Upcoming Movies</h3><p>Get updates about upcoming movies.</p></div>
                    <div><strong>02</strong><h3>Reviews & Ratings</h3><p>Read reviews and check movie ratings.</p></div>
                    <div><strong>03</strong><h3>Latest Releases</h3><p>Stay updated with the latest releases.</p></div>
                </div>
            </section>}

            <footer><a className="brand" href="#top" onClick={(event) => { event.preventDefault(); navigateTo('home') }}><span className="brand-mark">MV</span><span>Movie<span>Verse</span></span></a><p>© 2026 MovieVerse · Made for the curious</p></footer>
        </main>
    )
}

export default App;