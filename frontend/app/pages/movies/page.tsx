
import { Suspense } from "react";
import FetchWatchList from "./api/FetchMovies";
import Movie from "./components/movie";
import MovieToggle from "./components/toggle";
import { MovieModel } from "./models/MovieModel";


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
      <MovieToggle />
      <h1 className="text-3xl font-bold mb-8 capitalize">{type}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Suspense key={type}>
        {watchlist.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
