import Articles from "@/app/(index)/components/articles";
import { ArticleModel } from "@/app/(index)/models/ArticleModel";
import { FetchArticleModel } from "../models/FetchArticleModel";

export default async function FetchScrapedArticles({
    query,
    currentPage
}: {
    query: string;
    currentPage: number
}) {

    console.log('PAGHAAHAHA', currentPage)
    const API_HOST = process.env.FAST_API_URL;
    if (!API_HOST) {
      throw new Error('API host not configured');
    }
    let posts = []
    try {
        console.log(`${API_HOST}/get_articles/${currentPage}`)
        const response = await fetch(`${API_HOST}/get/articles/${currentPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.ok) {
            console.log('Data fetched')
        }
        posts = await response.json()

    } catch(err){
        console.error("Couldn't connect to server", err)
        return (
            <div>
                <h1>No data collected, if this error continues. Contact your Developer department</h1>
            </div>
        )
    }
    
    return (
        <ul className="grid grid-cols-4 gap-4">
        {posts.map((post: FetchArticleModel) => (
          <article key={post.id}> 
          <h2>{post.id}{post.title}</h2>
          </article>
        ))}
      </ul>
      )
}