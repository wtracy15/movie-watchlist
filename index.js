const form = document.getElementById('form')
const searchInput = document.getElementById('search')
const results = document.getElementById('results')
const header = document.getElementById('header')

document.addEventListener('click', function(e){
    if(e.target.closest("#watchlist-btn")){
        window.location.href = 'watchlist.html'
    } else if (e.target.closest(".add-watchlist-btn")){
        addMovieToWatchlist(e.target)
    }
})

form.addEventListener('submit', function(e){
    //TODO: Add IMDB ID as div ID
    e.preventDefault()
    const search = searchInput.value
    
    fetch(`https://www.omdbapi.com/?apikey=XXXXXXXXX=${search}`)
        .then(res => res.json())
        .then(data => {
            let resultsHtml = ''
            data.Search.forEach(result => {
                fetch(`https://www.omdbapi.com/?apikey=XXXXXXXXX=${result.imdbID}`)
                    .then(res => res.json())
                    .then(imdbData => {
                        let watchlist = JSON.parse(localStorage.getItem('watchlist'))
                        if (watchlist === null){
                            watchlist = []
                        }
                        resultsHtml += `
                            <div class="movie" id=${result.imdbID}>
                                <img class="poster" src=${result.Poster}>
                                <div class="movie-info">
                                    <h3 class="title">${result.Title} <span class="imdb-rating">⭐ ${imdbData.imdbRating}</span></h3>
                                    <div class="info-bar">
                                        <p class="runtime">${imdbData.Runtime}</p>
                                        <p class="genre">${imdbData.Genre}</p>`
                        if(watchlist.filter(movie => movie.id === result.imdbID).length === 0){
                            resultsHtml += `
                                        <button class="add-watchlist-btn"><span class="plus">+</span> Add to watchlist</button>`
                        } else {
                            resultsHtml += `<p>Added to watchlist</p>`
                        }
                        resultsHtml += `                
                                    </div>
                                    <p class="plot">${imdbData.Plot}</p>
                                </div>
                            </div>
                        `
                        results.innerHTML = resultsHtml
                    })
                    
            })
            
        })
})

function addMovieToWatchlist(target){
    
    
    const watchlistRaw = localStorage.getItem('watchlist');
    const watchlist = watchlistRaw ? JSON.parse(watchlistRaw) : [];
    const movieElement = target.closest(".movie")
    const movieData = {
        id: movieElement.id,
        img: movieElement.querySelector('img').src,
        title: movieElement.querySelector('.title').textContent,
        runtime: movieElement.querySelector('.runtime').textContent,
        genre: movieElement.querySelector('.genre').textContent,
        plot: movieElement.querySelector('.plot').textContent
    }
    console.log(watchlist)
    watchlist.push(movieData)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    
    const p = document.createElement("p")
    p.textContent = "Added to watchlist"
    target.replaceWith(p)
}