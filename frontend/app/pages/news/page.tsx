import FetchNews from "./api/fetchNews"
import NewsArticle from "./components/news_article"
import { NewsModel } from "./model/NewsModel"

export default async function NewsPage() {

    const all_news: NewsModel[] = await FetchNews() as any

    if (!Array.isArray(all_news)) return all_news

    return (
        <div className="container mx-auto px-4 py-8">
          {all_news.map(section => (
            <div key={section.section} className="mb-12">
                <h2 className="text-3xl font-bold mb-8 capitalize">{section.section}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {section.results.map((article, index) => (
                        <NewsArticle key={article.title + index} article={article} />
                    ))}
                </div>
            </div>
          ))}
        </div>
      )
}