import Link from "next/link";
import Image from "next/image";
import { NewsModel } from "../model/NewsModel";
import { Newspaper, ExternalLink } from "lucide-react";

type Article = NewsModel['results'][0];

export default function NewsArticle({ article }: { article: Article }) {
    // Find the best image, prefer 'Super Jumbo' or 'threeByTwoSmall2x' or just take the first one
    const image = article.multimedia?.find(m => m.format === "Super Jumbo") || 
                  article.multimedia?.find(m => m.format === "threeByTwoSmallAt2X") || 
                  article.multimedia?.find(m => m.format === "mediumThreeByTwo440") ||
                  article.multimedia?.[0];
    
    let imageUrl = null;
    if (image?.url) {
        // Check if URL is already complete or needs prefix
        if (image.url.startsWith('http')) {
            imageUrl = image.url;
        } else {
            imageUrl = `https://www.nytimes.com/${image.url}`;
        }
    }

    return (
        <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl bg-card"
            style={{ aspectRatio: '2/3' }}
        >
            {imageUrl ? (
                <>
                    <Image
                        src={imageUrl}
                        alt={image.caption || article.title}
                        fill
                        className="object-cover transition duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-b via-background/20 to-black" />
                </>
            ) : (
                <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
                    <Newspaper className="w-16 h-16 text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-300" />
                </div>
            )}

            <div className="relative z-10 flex flex-1 flex-col justify-end p-4 text-foreground">
                <div className="flex items-center justify-between mb-auto pb-3">
                    <span className="rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-foreground shadow-lg">
                        {article.section}
                    </span>
                </div>

                <div className="mb-3">
                    <h2 className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-lg mb-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                        {article.title}
                    </h2>
                    {article.abstract && (
                        <p className="text-xs text-white/80 drop-shadow-md line-clamp-3">
                            {article.abstract}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-end">
                    <div className="flex items-center justify-center h-10 px-4 rounded-lg bg-white/90 backdrop-blur-md border border-white/40 hover:bg-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl group/button">
                        <span className="text-sm font-semibold text-zinc-800 flex items-center gap-1.5 tracking-wide">
                            <ExternalLink className="w-4 h-4" />
                            Læs mere
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
