import Link from "next/link";
import { MovieModel } from "../models/MovieModel";
import { Film, Info } from "lucide-react";
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

    const imageUrl = movie.movie.images?.fanart?.[0] || 
                     movie.movie.images?.thumb?.[0] || 
                     movie.movie.images?.poster?.[0];
    
    return (
        <div
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl bg-card"
            style={{ aspectRatio: '2/3' }}
        >
            {imageUrl ? (
                <>
                    <img 
                        src={`https://${imageUrl}`} 
                        alt={movie.movie.title}
                        className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-black" />
                </>
            ) : (
                <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
                    <Film className="w-16 h-16 text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-300" />
                </div>
            )}

            <div className="relative z-10 flex flex-1 flex-col justify-end p-4 text-foreground">

                <div className="flex items-center justify-between mb-auto pb-3">
                    <span className="rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-foreground shadow-lg">
                        {movie.movie.year}
                    </span>
                    <span className="rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-foreground shadow-lg">
                        {formattedDate}
                    </span>
                </div>

                {/* Titel */}
                <div className="mb-3">
                    <h3 className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-lg mb-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                        {movie.movie.title}
                    </h3>
                </div>

                <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-2">
                        <Link 
                            href={`https://trakt.tv/movies/${movie.movie.ids.slug}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-background/90 backdrop-blur-sm border border-white/20 hover:bg-background hover:scale-110 transition-all duration-200 group/link shadow-lg"
                            title="Se på Trakt"
                        >
                            <img 
                                src={TRAKT_LOGO} 
                                alt="Trakt logo" 
                                className="w-4 h-4 object-contain"
                            />
                        </Link>
                        <Link 
                            href={`https://www.rottentomatoes.com/search?search=${movie.movie.title.toLowerCase()}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-background/90 backdrop-blur-sm border border-white/20 hover:bg-background hover:scale-110 transition-all duration-200 group/link shadow-lg"
                            title="Se på Rotten Tomatoes"
                        >
                            <img 
                                src={ROTTEN_TOMATOES_LOGO} 
                                alt="Rotten Tomatoes logo" 
                                className="w-4 h-4 object-contain"
                            />
                        </Link>
                        <Link 
                            href={`/pages/movies/pages/dbpedia/${movie.movie.ids.slug}?title=${movie.movie.title}`}
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-background/90 backdrop-blur-sm border border-white/20 hover:bg-background hover:scale-110 transition-all duration-200 group/link shadow-lg"
                            title="Se på DBpedia"
                        >
                            <img 
                                src={DBPEDIA_LOGO} 
                                alt="DBpedia logo" 
                                className="w-4 h-4 object-contain"
                            />
                        </Link>
                    </div>

                    <Link 
                        href={`/pages/movies/pages/tmdb/${movie.movie.ids.imdb}`} 
                        className="ml-auto flex items-center justify-center h-9 px-3.5 rounded-lg bg-white/90 backdrop-blur-md border border-white/40 hover:bg-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl group/button"
                    >
                        <span className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5 tracking-wide">
                            <Info className="w-3.5 h-3.5" />
                            Info
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
