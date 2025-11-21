import Link from "next/link";
import Image from "next/image";
import { BookModel } from "../model/books";

export default function SingularBook({ book }: { book: BookModel }) {
    const formattedDate = book.date ? new Date(book.date).toLocaleDateString('da-DK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link 
                href="/pages/books"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
                ← Tilbage til alle bøger
            </Link>
            
            <article className="rounded-2xl border border-border/60 shadow-lg overflow-hidden">
                <div className="h-1 w-full bg-linear-to-r from-primary/70 via-primary to-primary/60" />
                
                <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {book.image && (
                            <div className="shrink-0 w-full md:w-64">
                                <div className="relative rounded-xl border border-border/40 bg-card/80 shadow-sm ring-1 ring-white/5 overflow-hidden">
                                    <Image
                                        alt={book.title ?? "Book cover"}
                                        width={300}
                                        height={600}
                                        src={book.image}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        )}
                        
                        <div className="flex-1 space-y-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="rounded-full border border-border/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                                        Bog #{book.number}
                                    </span>
                                    {book.completed === "true" && (
                                        <span className="rounded-full border border-green-500/40 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                                            ✓ Læst
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                    {book.title}
                                </h1>
                                {formattedDate && (
                                    <p className="text-muted-foreground">
                                        {formattedDate}
                                    </p>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}


//{book.notes && (
//    <div className="pt-6 border-t border-border/60">
//        <h2 className="text-lg font-semibold mb-3">Noter</h2>
//        <div className="prose prose-sm max-w-none text-foreground">
//            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
//                {book.notes}
//            </p>
//        </div>
//    </div>
//)}