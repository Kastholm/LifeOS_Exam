export default function MovieDetails({ data }: { data: DbpediaData }) {
  const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
      <div className="text-foreground">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header med billede */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Titel og info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{data.label || "Film"}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                {data.releaseDate && <span>{data.releaseDate}</span>}
                {data.runtime && <span>• {data.runtime}</span>}
                {data.genres && <span>• {data.genres}</span>}
                {data.rating && <span>• Rating: {data.rating}</span>}
              </div>
              
              {/* Beskrivelse */}
              {data.abstract && (
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">Beskrivelse</h2>
                  <p className="text-muted-foreground leading-relaxed">{data.abstract}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {data.directors && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Instruktør">{data.directors}</InfoSection>
            </div>
          )}

          {data.writers && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Forfatter">{data.writers}</InfoSection>
            </div>
          )}

          {data.producers && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Producent">{data.producers}</InfoSection>
            </div>
          )}

          {data.musicComposers && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Musikkomponist">{data.musicComposers}</InfoSection>
            </div>
          )}

          {data.cinematographers && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Fotograf">{data.cinematographers}</InfoSection>
            </div>
          )}

          {data.editors && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Klipper">{data.editors}</InfoSection>
            </div>
          )}

          {data.starring && (
            <div className="p-4 rounded-lg bg-card border border-border/60 md:col-span-2">
              <InfoSection title="Skuespillere">{data.starring}</InfoSection>
            </div>
          )}

          {data.distributors && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Distributør">{data.distributors}</InfoSection>
            </div>
          )}

          {data.countries && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Land">{data.countries}</InfoSection>
            </div>
          )}

          {data.languages && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Sprog">{data.languages}</InfoSection>
            </div>
          )}

          {data.budget && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Budget">{data.budget}</InfoSection>
            </div>
          )}

          {data.gross && (
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <InfoSection title="Indtjening">{data.gross}</InfoSection>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

