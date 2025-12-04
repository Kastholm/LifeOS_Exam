import Link from "next/link";
import FetchGoogleBook from "../../../api/FetchGoogleBook";
import GoogleBook from "../../../components/google_book";
import { GoogleBookModel } from "../../../models/google_book";

export default async function GoogleBookPage({ params }: { params: { book: string } }) {
  const { book: title } = await params;
  
  // Decode URL parameter (håndterer spaces og specialtegn)
  const decodedTitle = decodeURIComponent(title);
  
  const bookData = await FetchGoogleBook(decodedTitle);

  if (!bookData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-2">Ingen bog fundet</p>
          <p className="text-sm text-muted-foreground/70">Søgte efter: {decodedTitle || "ukendt"}</p>
          <Link 
            href="/pages/books"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4"
          >
            ← Tilbage til alle bøger
          </Link>
        </div>
      </div>
    );
  }

  const book = bookData as GoogleBookModel;
  const volumeInfo = book.volumeInfo;

  const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
      <div className="text-foreground">{children}</div>
    </div>
  );

  const imageUrl = volumeInfo.imageLinks?.large || 
                   volumeInfo.imageLinks?.medium || 
                   volumeInfo.imageLinks?.small || 
                   volumeInfo.imageLinks?.thumbnail;

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

  
  return (<div className="min-h-screen bg-background">
    {/* Backdrop banner */}
    {imageUrl && (
      <div className="relative h-96 w-full overflow-hidden">
        <img 
          src={imageUrl.replace('http://', 'https://')}
          alt={volumeInfo.title ?? "Book cover"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
      </div>
    )}

    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Tilbage link */}
      <Link 
        href="/pages/books"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        ← Tilbage til alle bøger
      </Link>

      {/* Header med bogcover */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Bogcover */}
          {imageUrl && (
            <div className="shrink-0">
              <img 
                src={imageUrl.replace('http://', 'https://')}
                alt={volumeInfo.title ?? "Book cover"}
                className="w-full md:w-80 h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          )}
          
          {/* Titel og info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">{volumeInfo.title}</h1>
            {volumeInfo.subtitle && (
              <h2 className="text-xl text-muted-foreground mb-3">{volumeInfo.subtitle}</h2>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              {volumeInfo.publishedDate && <span>{formatDate(volumeInfo.publishedDate)}</span>}
              {volumeInfo.pageCount && <span>• {volumeInfo.pageCount} sider</span>}
              {volumeInfo.language && <span>• {volumeInfo.language.toUpperCase()}</span>}
              {volumeInfo.averageRating && (
                <span>• ⭐ {volumeInfo.averageRating.toFixed(1)} ({volumeInfo.ratingsCount || 0} stemmer)</span>
              )}
            </div>
            
            {/* Beskrivelse */}
            {volumeInfo.description && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Beskrivelse</h2>
                <p className="text-muted-foreground leading-relaxed line-clamp-6">{volumeInfo.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {volumeInfo.authors && volumeInfo.authors.length > 0 && (
          <div className="p-4 rounded-lg bg-card border border-border/60">
            <InfoSection title="Forfatter">
              {volumeInfo.authors.join(', ')}
            </InfoSection>
          </div>
        )}

        {volumeInfo.publisher && (
          <div className="p-4 rounded-lg bg-card border border-border/60">
            <InfoSection title="Forlag">
              {volumeInfo.publisher}
            </InfoSection>
          </div>
        )}

        {volumeInfo.publishedDate && (
          <div className="p-4 rounded-lg bg-card border border-border/60">
            <InfoSection title="Udgivelsesdato">
              {formatDate(volumeInfo.publishedDate)}
            </InfoSection>
          </div>
        )}

        {volumeInfo.pageCount && (
          <div className="p-4 rounded-lg bg-card border border-border/60">
            <InfoSection title="Sider">
              {volumeInfo.pageCount} sider
            </InfoSection>
          </div>
        )}

        {volumeInfo.categories && volumeInfo.categories.length > 0 && (
          <div className="p-4 rounded-lg bg-card border border-border/60">
            <InfoSection title="Kategorier">
              {volumeInfo.categories.join(', ')}
            </InfoSection>
          </div>
        )}

        {volumeInfo.averageRating && (
          <div className="p-4 rounded-lg bg-card border border-border/60">
            <InfoSection title="Rating">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-lg font-semibold">{volumeInfo.averageRating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">/ 5</span>
                {volumeInfo.ratingsCount && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({volumeInfo.ratingsCount} stemmer)
                  </span>
                )}
              </div>
            </InfoSection>
          </div>
        )}

        {volumeInfo.language && (
          <div className="p-4 rounded-lg bg-card border border-border/60">
            <InfoSection title="Sprog">
              {volumeInfo.language.toUpperCase()}
            </InfoSection>
          </div>
        )}
      </div>

      {/* Fuld beskrivelse */}
      {volumeInfo.description && (
        <div className="mb-8">
          <div className="bg-card border border-border/60 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <span className="text-primary">📖</span> Beskrivelse
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {volumeInfo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
}

