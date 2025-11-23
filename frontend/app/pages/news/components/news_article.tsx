import Link from "next/link";
import Image from "next/image";
import { NewsModel } from "../model/NewsModel";

type Article = NewsModel['results'][0];

export default function NewsArticle({ article }: { article: Article }) {
    // Find the best image, prefer 'Super Jumbo' or 'threeByTwoSmall2x' or just take the first one
    const image = article.multimedia?.find(m => m.format === "Super Jumbo") || 
                  article.multimedia?.find(m => m.format === "threeByTwoSmallAt2X") || 
                  article.multimedia?.[0];
    const imageUrl = image?.url;

    return (
        <Link 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg bg-card"
        >
            <div className="h-0.5 w-full bg-linear-to-r from-primary/70 via-primary to-primary/60 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            
            {imageUrl && (
                <div className="relative mx-4 mt-4 rounded-xl border border-border/40 bg-card/80 shadow-sm ring-1 ring-white/5 backdrop-blur overflow-hidden aspect-video">
                    <Image
                        alt={image.caption || article.title}
                        width={400}
                        height={300}
                        src={imageUrl}
                        className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                </div>
            )}
            
            <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-5 text-foreground">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                    <span className="rounded-full border border-border/40 px-2.5 py-1 font-medium">
                        {article.section}
                    </span>
                </div>
                
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary line-clamp-3">
                        {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/90 line-clamp-3 leading-relaxed">
                        {article.abstract}
                    </p>
                </div>
                
                <div className="mt-auto flex items-center justify-end pt-2">
                    <span className="text-xs font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 flex items-center gap-1">
                        Læs mere <span className="text-lg leading-none">↗</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}
