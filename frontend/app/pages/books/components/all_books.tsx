import Link from "next/link";
import Image from "next/image";
import { BookModel } from "../model/books";

export default function AllBooks(props: { books: BookModel[] }) {
    const { books } = props
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Alle Bøger</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                    <Link 
                        key={book._id} 
                        href={`/pages/books/${book?.number}`}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg"
                    >
                        <div className="h-0.5 w-full bg-linear-to-r from-primary/70 via-primary to-primary/60 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                        {book.image && (
                            <div className="relative mx-4 mt-4 rounded-xl border border-border/40 bg-card/80 shadow-sm ring-1 ring-white/5 backdrop-blur overflow-hidden">
                                <Image
                                    alt={book.title ?? "Book cover"}
                                    width={300}
                                    height={600}
                                    src={book.image}
                                    className="max-h-72 md:max-h-96 w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                                />
                            </div>
                        )}
                        <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-5 text-foreground">
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                                <span className="rounded-full border border-border/40 px-2.5 py-1 font-medium">
                                    #{book.number}
                                </span>
                                {book.date && (
                                    <span className="font-medium text-muted-foreground/70">
                                        {new Date(book.date).getFullYear()}
                                    </span>
                                )}
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary">
                                    {book.title}
                                </h2>
                                {book.completed && (
                                    <p className="text-xs text-muted-foreground/70">
                                        {book.completed === "true" ? "✓ Læst" : "Ikke læst"}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}