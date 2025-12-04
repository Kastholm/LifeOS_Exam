
import { Suspense } from "react";
import FetchWatchList from "./api/FetchTraktMovies";
import Movie from "./components/movie";
import MovieToggle from "./components/toggle";
import { MovieModel } from "./models/MovieModel";


export const revalidate = 3600; // 1 hour

export default async function Movies(props: {
  searchParams?: Promise<{
    movie_type?: string
  }>;
}) {
  const searchParams = await props.searchParams;
  const type = searchParams?.movie_type || 'watchlist';
  const watchlist: MovieModel[] = await FetchWatchList({ type });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {type === 'watchlist' ? 'Watchlist' : 'History'}
            </h1>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              {type === 'watchlist' ? 'Film du vil se' : 'Film du har set'}
            </p>
          </div>
          <MovieToggle />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <Suspense key={type}>
        {watchlist.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
