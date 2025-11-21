
export default async function PostScrapedArticles({
    blog_id,
    fetch_site_id,
    title,
    description
}: {
    blog_id: number;
    fetch_site_id: number;
    title: string,
    description: string
}) {

    let article_test = {
        "blog_id": blog_id,
        "fetch_site_id": fetch_site_id,
        "title": title,
        "description": description
    }

    console.log(article_test)

    const API_HOST = process.env.FAST_API_URL;
    if (!API_HOST) {
      throw new Error('API host not configured');
    }
    try {
        console.log(API_HOST)
        const response = await fetch(`${API_HOST}/post/article`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(article_test)
        })
        if (response.ok) {
            console.log('Data posted')
        }

    } catch(err){
        console.error("Couldn't connect to server", err)
        return (
            <div>
                <h1>No data collected, if this error continues. Contact your Developer department</h1>
            </div>
        )
    }
}