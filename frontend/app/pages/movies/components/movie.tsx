import Link from "next/link";
import { MovieModel } from "../models/MovieModel";
import { Film } from "lucide-react";
import Image from "next/image";

export default function Movie({ movie }: { movie: MovieModel }) {
    const formattedDate = new Date(movie.watched_at).toLocaleDateString('da-DK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Prøv at finde et passende billede: fanart > thumb > poster
    const imageUrl = movie.movie.images?.fanart?.[0] || 
                     movie.movie.images?.thumb?.[0] || 
                     movie.movie.images?.poster?.[0];
    
    return (
        <Link
            href={`https://trakt.tv/movies/${movie.movie.ids.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg bg-card"
        >
            <div className="h-0.5 w-full bg-linear-to-r from-primary/70 via-primary to-primary/60 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="relative mx-4 mt-4 rounded-xl border border-border/40 bg-muted/30 shadow-sm ring-1 ring-white/5 backdrop-blur overflow-hidden aspect-video flex items-center justify-center">
                {imageUrl ? (
                    <img 
                        src={`https://${imageUrl}`} 
                        alt={movie.movie.title}
                        className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <Film className="w-12 h-12 text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-300" />
                )}
            </div>
            
            <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-5 text-foreground">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                    <span className="rounded-full border border-border/40 px-2.5 py-1 font-medium">
                        {movie.movie.year}
                    </span>
                    <span className="font-medium text-muted-foreground/70">
                        {formattedDate}
                    </span>
                </div>
                
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary line-clamp-2">
                        {movie.movie.title}
                    </h3>
                    <p className="text-xs text-muted-foreground/70">
                        Set på Trakt
                    </p>
                </div>
                
                <div className="mt-auto flex items-center justify-end pt-2">
                    <span className="text-xs font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 flex items-center gap-1">
                        Se detaljer <span className="text-lg leading-none">↗</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}
