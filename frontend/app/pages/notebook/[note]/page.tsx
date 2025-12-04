import { client } from "@/app/global/sanity/client"
import { NOTE_QUERY } from "../api/FetchNotes"
import { NoteModel } from "../models/note"
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

const components: PortableTextComponents = {
    types: {
        image: ({value}) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <div className="relative w-full my-8 rounded-lg overflow-hidden">
                    <img
                        src={urlFor(value).url()}
                        alt={value.alt || "Note image"}
                        className="w-full h-auto rounded-lg"
                    />
                    {value.caption && (
                        <div className="mt-2 text-sm text-muted-foreground text-center">
                            {value.caption}
                        </div>
                    )}
                </div>
            )
        }
    },
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

export const revalidate = 3600; // 1 hour

export default async function SingularNote({ params }: { params: { note: string } }) {
    
    const { note: noteId } = await params
    const noteData: NoteModel | null = await client.fetch(NOTE_QUERY, { noteId })

    if (!noteData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground text-lg mb-2">Note ikke fundet</p>
                    <p className="text-sm text-muted-foreground/70">Note ID: {noteId}</p>
                    <Link 
                        href="/pages/notebook"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4"
                    >
                        ← Tilbage til alle noter
                    </Link>
                </div>
            </div>
        );
    }

    const note = noteData;

    const formattedDate = note.startDate ? new Date(note.startDate).toLocaleDateString('da-DK', {
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
            {note.image && (
                <div className="relative h-96 w-full overflow-hidden">
                    <img 
                        src={note.image}
                        alt={note.title ?? "Note cover"}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
                </div>
            )}

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Tilbage link */}
                <Link 
                    href="/pages/notebook"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    ← Tilbage til alle noter
                </Link>

                {/* Header med note image */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Note image */}
                        {note.image && (
                            <div className="shrink-0">
                                <img 
                                    src={note.image}
                                    alt={note.title ?? "Note cover"}
                                    className="w-full md:w-80 h-auto rounded-lg shadow-lg object-cover"
                                />
                            </div>
                        )}
                        
                        {/* Titel og info */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-3">{note.title}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                {formattedDate && <span>{formattedDate}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {formattedDate && (
                        <div className="p-4 rounded-lg bg-card border border-border/60">
                            <InfoSection title="Dato">
                                {formattedDate}
                            </InfoSection>
                        </div>
                    )}
                </div>

                {/* Content med PortableText */}
                {note.content && (
                    <div className="mb-8">
                        <div className="bg-card border border-border/60 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                <span className="text-primary">📝</span> Indhold
                            </h2>
                            <div className="prose prose-sm max-w-none">
                                <PortableText value={note.content} components={components} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

