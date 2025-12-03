import FetchNews from "./api/fetchNews"
import NewsArticle from "./components/news_article"
import { NewsModel } from "./model/NewsModel"

export default async function NewsPage() {

    const all_news: NewsModel[] = await FetchNews() as any

    if (!Array.isArray(all_news)) return all_news

    return (
        <div>
          {all_news.map(section => (
            <div key={section.section} className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-6">
                    {section.results.map((article, index) => (
                        <NewsArticle key={article.title + index} article={article} />
                    ))}
                </div>
            </div>
          ))}
        </div>
      )
}