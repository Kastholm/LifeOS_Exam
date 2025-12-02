import { client } from "@/app/global/sanity/client"
import { BOOK_QUERY } from "../../../api/FetchSanityBooks"
import { BookModel } from "../../../models/sanity_book"
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Link from "next/link";


const components: PortableTextComponents = {
    block: {
        h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>,
        h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary flex items-center gap-2">{children}</h2>,
        h3: ({children}) => <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>,
        h4: ({children}) => <h4 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h4>,
        normal: ({children}) => <p className="mb-4 text-foreground/80 leading-relaxed">{children}</p>,
        blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">{children}</blockquote>,
    },
    list: {
        bullet: ({children}) => <ul className="list-disc pl-5 mb-4 space-y-2 text-foreground/80">{children}</ul>,
        number: ({children}) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-foreground/80">{children}</ol>,
    },
    listItem: {
        bullet: ({children}) => <li className="pl-1 marker:text-primary">{children}</li>,
        number: ({children}) => <li className="pl-1 marker:text-primary">{children}</li>,
    },
};

export default async function SingularBook({ params }: { params: { book: string } }) {
    
    const { book: bookParam } = await params
    const bookNumber = Number(bookParam)
    const bookData: BookModel | null = await client.fetch(BOOK_QUERY, { book: bookNumber })

    if (!bookData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground text-lg mb-2">Bog ikke fundet</p>
                    <p className="text-sm text-muted-foreground/70">Bog nummer: {bookNumber}</p>
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

    const book = bookData;

    const formattedDate = book.date ? new Date(book.date).toLocaleDateString('da-DK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : null;

    const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
            <div className="text-foreground">{children}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Backdrop banner */}
            {book.image && (
                <div className="relative h-96 w-full overflow-hidden">
                    <img 
                        src={book.image}
                        alt={book.title ?? "Book cover"}
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
                        {book.image && (
                            <div className="shrink-0">
                                <img 
                                    src={book.image}
                                    alt={book.title ?? "Book cover"}
                                    className="w-full md:w-80 h-auto rounded-lg shadow-lg object-cover"
                                />
                            </div>
                        )}
                        
                        {/* Titel og info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="rounded-full border border-border/40 px-3 py-1 text-xs font-medium text-muted-foreground bg-card">
                                    Bog #{book.number}
                                </span>
                                {book.completed === "true" && (
                                    <span className="rounded-full border border-green-500/40 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                                        ✓ Læst
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold mb-3">{book.title}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                {formattedDate && <span>{formattedDate}</span>}
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-4 rounded-lg bg-card border border-border/60">
                        <InfoSection title="Bog Nummer">
                            #{book.number}
                        </InfoSection>
                    </div>

                    {formattedDate && (
                        <div className="p-4 rounded-lg bg-card border border-border/60">
                            <InfoSection title="Dato">
                                {formattedDate}
                            </InfoSection>
                        </div>
                    )}

                    <div className="p-4 rounded-lg bg-card border border-border/60">
                        <InfoSection title="Status">
                            {book.completed === "true" ? (
                                <span className="text-green-600 dark:text-green-400 font-medium">✓ Læst</span>
                            ) : (
                                <span className="text-muted-foreground">Ikke læst</span>
                            )}
                        </InfoSection>
                    </div>
                </div>

                {/* Notes/beskrivelse med PortableText */}
                {book.notes && (
                    <div className="mb-8">
                        <div className="bg-card border border-border/60 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                <span className="text-primary">📖</span> Noter
                            </h2>
                            <div className="prose prose-sm max-w-none">
                                <PortableText value={book.notes} components={components} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}