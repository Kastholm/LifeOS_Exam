import Link from "next/link";
import Image from "next/image";
import { BookModel } from "../model/books";
import { BookOpen, Info } from "lucide-react";

export default function AllBooks(props: { books: BookModel[] }) {
    const { books } = props
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Alle Bøger</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {books.map((book) => (
                    <div
                        key={book._id}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl bg-card"
                        style={{ aspectRatio: '2/3' }}
                    >
                        {book.image ? (
                            <>
                                <img 
                                    src={book.image}
                                    alt={book.title ?? "Book cover"}
                                    className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-b via-background/20 to-black" />
                            </>
                        ) : (
                            <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
                                <BookOpen className="w-16 h-16 text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-300" />
                            </div>
                        )}

                        <div className="relative z-10 flex flex-1 flex-col justify-end p-4 text-foreground">
                            <div className="flex items-center justify-between mb-auto pb-3">
                                <span className="rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-foreground shadow-lg">
                                    #{book.number}
                                </span>
                                {book.date && (
                                    <span className="rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-foreground shadow-lg">
                                        {new Date(book.date).getFullYear()}
                                    </span>
                                )}
                            </div>

                            <div className="mb-3">
                                <h2 className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-lg mb-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                                    {book.title}
                                </h2>
                                {book.completed && (
                                    <p className="text-xs text-white/80 drop-shadow-md">
                                        {book.completed === "true" ? "✓ Læst" : "Ikke læst"}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-end">
                                <Link 
                                    href={`/pages/books/${book?.number}`}
                                    className="flex items-center justify-center h-9 px-3.5 rounded-lg bg-white/90 backdrop-blur-md border border-white/40 hover:bg-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl group/button"
                                >
                                    <span className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5 tracking-wide">
                                        <Info className="w-3.5 h-3.5" />
                                        Info
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}