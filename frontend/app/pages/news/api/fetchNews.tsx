export default async function FetchNews() {

    //The following values are allowed:
    //arts, automobiles, books/review, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, 
    //politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world

    const topics = [
        'home',
        'travel',
        'movies',
    ]
    const NY = {
        'api': process.env.NYT_API_KEY,
        'secret': process.env.NYT_API_SECRET
    }
    
    if(!NY.api || !NY.secret) {
        return (
            <div>News couldn't be fetched</div>
        )        
    }

    const all_news = await Promise.all(
        topics.map(async (topic) => {
            console.log(topic)
            try {
                const res = await fetch(`https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${NY.api}`)
                return await res.json()
            } catch(err) {
                console.error("No existing news, or couldn't fetch news for", topic)
            }
        })
    )

    if(all_news[0].fault) {
        return (
            <div>Wait a bit : {all_news[0].fault.faultstring}</div>
        )
    }

    return all_news
}