import fetchDbpedia from "../api/fetchDbpedia";
import MovieDetails from "../components/dbpedia_details";

export default async function MoviePage({ 
  searchParams 
}: { 
  searchParams?: Promise<{ title?: string }>;
}) {
  const search = await searchParams;
  const title = search?.title;
  
  // Hent data fra DBpedia
  const dbpediaData = await fetchDbpedia(title);

  if (!dbpediaData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-2">Ingen data fundet i DBpedia</p>
          <p className="text-sm text-muted-foreground/70">Søgte efter: {title || "ukendt"}</p>
        </div>
      </div>
    );
  }

  return <MovieDetails data={dbpediaData} />;
}
