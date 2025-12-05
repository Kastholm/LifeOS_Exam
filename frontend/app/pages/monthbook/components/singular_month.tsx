import Link from "next/link";
import { MonthModel } from "../model/month";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { BookOpen, Briefcase, Dumbbell, Lightbulb, User } from "lucide-react";
import imageUrlBuilder from '@sanity/image-url'
import { client } from "@/app/global/sanity/client";
import Image from "next/image";

const builder = imageUrlBuilder(client)

function getMonthName(month: number) {
    const months = [
        "Januar",
        "Februar",
        "Marts",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "December"
    ]
    return months[month - 1]
}

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
                <div className="relative w-lg h-128 my-8 rounded-lg overflow-hidden">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || "Month image"}
                        fill
                        className="object-cover"
                    />
                    {value.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm text-center">
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

export default function SingularMonth({ month }: { month: MonthModel }) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
                <Link 
                    href="/pages/monthbook"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    ← Tilbage til alle måneder
                </Link>

                <Link 
                    href={`/pages/sanity/structure/maanedsbog;${month._id}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border hover:bg-muted/80 transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/9/95/Sanity-square-logo.png" 
                        alt="Sanity" 
                        className="w-4 h-4 opacity-90 group-hover:opacity-100 transition-opacity" 
                    />
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">Rediger</span>
                </Link>
            </div>
            
            <article className="rounded-2xl border border-border/60 shadow-lg overflow-hidden bg-card">
                <div className="h-1 w-full bg-linear-to-r from-primary/70 via-primary to-primary/60" />
                
                <div className="p-8 border-b border-border/40 bg-muted/20">
                    <div className="flex items-center gap-3 mb-2">
                        {month.year && (
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                                {month.year}
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        {month.month} - {getMonthName(parseInt(month.month))}
                    </h1>
                </div>
                
                <div className="p-8 space-y-12">
                    {/* General Section */}
                    {month.general && (
                        <section className="bg-muted/30 p-6 rounded-xl border border-border/40">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-foreground">
                                <span className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                                    <BookOpen className="w-6 h-6" />
                                </span>
                                Generelt
                            </h2>
                            <PortableText value={month.general} components={components} />
                        </section>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Work Section */}
                        {month.work && (
                            <section className="bg-card border border-border/40 p-6 rounded-xl shadow-sm">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 text-foreground">
                                    <span className="p-2 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg">
                                        <Briefcase className="w-5 h-5" />
                                    </span>
                                    Arbejde
                                </h2>
                                <PortableText value={month.work} components={components} />
                            </section>
                        )}

                        {/* Training Section */}
                        {month.training && (
                            <section className="bg-card border border-border/40 p-6 rounded-xl shadow-sm">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 text-foreground">
                                    <span className="p-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-lg">
                                        <Dumbbell className="w-5 h-5" />
                                    </span>
                                    Træning
                                </h2>
                                <PortableText value={month.training} components={components} />
                            </section>
                        )}

                        {/* Development Section */}
                        {month.development && (
                            <section className="bg-card border border-border/40 p-6 rounded-xl shadow-sm">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 text-foreground">
                                    <span className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-lg">
                                        <Lightbulb className="w-5 h-5" />
                                    </span>
                                    Udvikling
                                </h2>
                                <PortableText value={month.development} components={components} />
                            </section>
                        )}

                        {/* Self Development Section */}
                        {month.selfDevelopment && (
                            <section className="bg-card border border-border/40 p-6 rounded-xl shadow-sm">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 text-foreground">
                                    <span className="p-2 bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 rounded-lg">
                                        <User className="w-5 h-5" />
                                    </span>
                                    Selvudvikling
                                </h2>
                                <PortableText value={month.selfDevelopment} components={components} />
                            </section>
                        )}
                    </div>
                </div>
            </article>
        </div>
    )
}