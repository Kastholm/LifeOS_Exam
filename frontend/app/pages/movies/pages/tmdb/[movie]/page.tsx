import FetchTMDBMovie from "../api/FetchTMDBMovie";
import TMDBMovie from "../components/tmdb_movie";


export default async function MoviePage({ 
  params 
}: { 
  params: Promise<{ movie: string }>;
}) {
  const { movie: imdbId } = await params;

  console.log("IMDb ID:", imdbId);

  const movie_data = await FetchTMDBMovie({ id: imdbId });

  console.log("Movie data:", movie_data);

  if (!movie_data || !movie_data.id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-2">Ingen film fundet</p>
          <p className="text-sm text-muted-foreground/70">Søgte efter IMDb ID: {imdbId || "ukendt"}</p>
        </div>
      </div>
    );
  }

  return <TMDBMovie data={movie_data} />;
}
