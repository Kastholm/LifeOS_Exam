
export default function TMDBMovie({ data }: { data: TMDBMovieData }) {
  const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
      <div className="text-foreground">{children}</div>
    </div>
  );

  if (!data || !data.id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-2">Ingen film fundet</p>
        </div>
      </div>
    );
  }

  const movie = data;
  
  // Formatér valuta
  const formatCurrency = (value: number | undefined) => {
    if (!value || value === 0) return null;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toLocaleString()}`;
  };

  // Formatér dato
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('da-DK', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Formatér runtime
  const formatRuntime = (minutes: number | undefined) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}t ${mins}min`;
    }
    return `${mins} minutter`;
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  // Hent cast (top 10)
  const topCast = movie.credits?.cast?.slice(0, 10) || [];
  
  // Hent crew
  const directors = movie.credits?.crew?.filter(person => person.job === 'Director') || [];
  const producers = movie.credits?.crew?.filter(person => 
    person.job === 'Producer' || person.department === 'Production'
  ) || [];
  const writers = movie.credits?.crew?.filter(person => 
    person.job === 'Writer' || person.department === 'Writing'
  ) || [];
  const cinematographers = movie.credits?.crew?.filter(person => person.job === 'Director of Photography') || [];
  const editors = movie.credits?.crew?.filter(person => person.job === 'Editor') || [];
  const composers = movie.credits?.crew?.filter(person => person.job === 'Original Music Composer') || [];
  
    return (
      <div className="min-h-screen bg-background">
        {/* Backdrop */}
        {backdropUrl && (
          <div className="relative h-96 w-full overflow-hidden">
            <img 
              src={backdropUrl} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
          </div>
        )}
  
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header med poster */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              {posterUrl && (
                <div className="shrink-0">
                  <img 
                    src={posterUrl} 
                    alt={movie.title} 
                    className="w-full md:w-80 h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              )}
              
              {/* Titel og info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  {movie.release_date && <span>{formatDate(movie.release_date)}</span>}
                  {movie.runtime && <span>• {formatRuntime(movie.runtime)}</span>}
                  {movie.genres && movie.genres.length > 0 && (
                    <span>• {movie.genres.map(g => g.name).join(', ')}</span>
                  )}
                  {movie.vote_average > 0 && (
                    <span>• ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()} stemmer)</span>
                  )}
                </div>
                
                {movie.tagline && (
                  <p className="text-lg italic text-muted-foreground mb-4">"{movie.tagline}"</p>
                )}
                
                {/* Beskrivelse */}
                {movie.overview && (
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Beskrivelse</h2>
                    <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
  
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {directors.length > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Instruktør">
                  {directors.map(d => d.name).join(', ')}
                </InfoSection>
              </div>
            )}

            {writers.length > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Forfatter">
                  {writers.map(w => w.name).join(', ')}
                </InfoSection>
              </div>
            )}

            {producers.length > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Producent">
                  {producers.slice(0, 5).map(p => p.name).join(', ')}
                </InfoSection>
              </div>
            )}

            {cinematographers.length > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Fotograf">
                  {cinematographers.map(c => c.name).join(', ')}
                </InfoSection>
              </div>
            )}

            {editors.length > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Klipper">
                  {editors.map(e => e.name).join(', ')}
                </InfoSection>
              </div>
            )}

            {composers.length > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Musikkomponist">
                  {composers.map(c => c.name).join(', ')}
                </InfoSection>
              </div>
            )}

            {topCast.length > 0 && (
              <div className="p-6 rounded-lg bg-card border border-border/60 md:col-span-2">
                <InfoSection title="Skuespillere">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {topCast.map(actor => (
                      <div key={actor.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        {actor.profile_path && (
                          <img 
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                            className="w-16 h-16 rounded-lg object-cover shrink-0"
                          />
                        )}
                        {!actor.profile_path && (
                          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <span className="text-2xl">🎭</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-base mb-1">{actor.name}</div>
                          {actor.character && (
                            <div className="text-sm text-muted-foreground line-clamp-2">{actor.character}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </InfoSection>
              </div>
            )}

            {movie.production_countries && movie.production_countries.length > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Land">
                  {movie.production_countries.map(c => c.name).join(', ')}
                </InfoSection>
              </div>
            )}

            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Sprog">
                  {movie.spoken_languages.map(l => l.english_name || l.name).join(', ')}
                </InfoSection>
              </div>
            )}

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Produktionsselskab">
                  <div className="flex flex-wrap gap-2">
                    {movie.production_companies.map(c => (
                      <span key={c.id} className="text-sm">
                        {c.name}
                      </span>
                    )).reduce((acc, curr, idx) => 
                      acc.length === 0 ? [curr] : [...acc, <span key={idx} className="text-muted-foreground">•</span>, curr], 
                      [] as React.ReactNode[]
                    )}
                  </div>
                </InfoSection>
              </div>
            )}

            {movie.budget && movie.budget > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Budget">
                  {formatCurrency(movie.budget)}
                </InfoSection>
              </div>
            )}

            {movie.revenue && movie.revenue > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Indtjening">
                  {formatCurrency(movie.revenue)}
                </InfoSection>
              </div>
            )}

            {movie.status && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="Status">{movie.status}</InfoSection>
              </div>
            )}

            {movie.imdb_id && (
              <div className="p-4 rounded-lg bg-card border border-border/60">
                <InfoSection title="IMDb ID">
                  <a 
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {movie.imdb_id}
                  </a>
                </InfoSection>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }