import Link from "next/link";
import { MovieModel } from "../models/MovieModel";
import { Film } from "lucide-react";
import Image from "next/image";

// Logo URLs
const TRAKT_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Trakt.tv-favicon.svg/2048px-Trakt.tv-favicon.svg.png";
const TMDB_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tmdb.new.logo.svg/2560px-Tmdb.new.logo.svg.png";
const ROTTEN_TOMATOES_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/2019px-Rotten_Tomatoes.svg.png";
const DBPEDIA_LOGO = "https://upload.wikimedia.org/wikipedia/commons/c/c0/DBpedia-Logo_.png";

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
        <div
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
                
                <div className="space-y-2 mb-8">
                    <h3 className="text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary line-clamp-2">
                        {movie.movie.title}
                    </h3>
                </div>

                <div className="flex items-center gap-3">
                    <Link 
                        href={`https://trakt.tv/movies/${movie.movie.ids.slug}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-muted-foreground/70 hover:opacity-80 transition-opacity duration-200 group/link"
                        title="Se på Trakt"
                    >
                        <img 
                            src={TRAKT_LOGO} 
                            alt="Trakt logo" 
                            className="w-4 h-4 object-contain group-hover/link:scale-110 transition-transform duration-200"
                        />
                        <span className="text-xs font-medium">Trakt</span>
                    </Link>
                    <Link 
                        href={`https://www.rottentomatoes.com/search?search=${movie.movie.title.toLowerCase()}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-muted-foreground/70 hover:opacity-80 transition-opacity duration-200 group/link"
                        title="Se på Rotten Tomatoes"
                    >
                        <img 
                            src={ROTTEN_TOMATOES_LOGO} 
                            alt="Rotten Tomatoes logo" 
                            className="w-4 h-4 object-contain group-hover/link:scale-110 transition-transform duration-200"
                        />
                        <span className="text-xs font-medium">RT</span>
                    </Link>
                    <Link 
                        href={`/pages/movies/pages/tmdb/${movie.movie.ids.imdb}`}
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-muted-foreground/70 hover:opacity-80 transition-opacity duration-200 group/link"
                        title="Se på TMDB"
                    >
                        <img 
                            src={TMDB_LOGO} 
                            alt="TMDB logo" 
                            className="w-4 h-4 object-contain group-hover/link:scale-110 transition-transform duration-200"
                        />
                        <span className="text-xs font-medium">TMDB</span>
                    </Link>
                    <Link href={`/pages/movies/pages/dbpedia/${movie.movie.ids.slug}?title=${movie.movie.title}`} 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-muted-foreground/70 hover:opacity-80 transition-opacity duration-200 group/link"
                        title="Se på DBpedia"
                    >
                        <img 
                            src={DBPEDIA_LOGO} 
                            alt="DBpedia logo" 
                            className="w-4 h-4 object-contain group-hover/link:scale-110 transition-transform duration-200"
                        />
                        <span className="text-xs font-medium">DBpedia</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}
