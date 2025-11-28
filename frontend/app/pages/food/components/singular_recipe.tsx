import Link from "next/link";
import Image from "next/image";
import { RecipeModel } from "../model/recipes";
import { PortableText, PortableTextComponents } from "@portabletext/react";

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

export default function SingularRecipe({ recipe }: { recipe: RecipeModel }) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <Link 
                href="/pages/food"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
                ← Tilbage til alle opskrifter
            </Link>
            
            <article className="rounded-2xl border border-border/60 shadow-lg overflow-hidden bg-card">
                <div className="h-1 w-full bg-linear-to-r from-primary/70 via-primary to-primary/60" />
                
                {/* Banner Image */}
                {recipe.image && (
                    <div className="relative w-full h-[400px] overflow-hidden">
                        <Image
                            alt={recipe.title ?? "Recipe cover"}
                            fill
                            src={recipe.image}
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                            <div className="flex items-center gap-3 mb-2">
                                {recipe.category && (
                                    <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                                        {recipe.category}
                                    </span>
                                )}
                                {recipe.rating && (
                                    <span className="bg-amber-500/90 text-white px-2 py-1 rounded-full text-sm font-medium">
                                        {recipe.rating} ⭐
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                {recipe.title}
                            </h1>
                            {recipe.timeEstimate && (
                                <p className="text-white/90 mt-2 font-medium flex items-center gap-2">
                                    ⏱ {recipe.timeEstimate} minutter
                                </p>
                            )}
                        </div>
                    </div>
                )}
                
                <div className="p-8">
                    {/* Header for mobile or if no image */}
                    {!recipe.image && (
                        <div className="mb-8 border-b border-border/60 pb-6">
                            <div className="flex items-center gap-3 mb-3">
                                {recipe.category && (
                                    <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                                        {recipe.category}
                                    </span>
                                )}
                                {recipe.rating && (
                                    <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-full text-xs font-medium">
                                        {recipe.rating} ⭐
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.title}</h1>
                            {recipe.timeEstimate && (
                                <p className="text-muted-foreground">⏱ {recipe.timeEstimate} minutter</p>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Venstre kolonne: Beskrivelse (70%) */}
                        <div className="lg:w-[70%] space-y-8">
                            {recipe.description && (
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-foreground/90">
                                        <span className="text-primary">📖</span> Fremgangsmåde
                                    </h2>
                                    <div className="bg-muted/30 p-6 rounded-xl border border-border/40">
                                        <PortableText value={recipe.description} components={components} />
                                    </div>
                                </div>
                            )}
                            
                            {recipe.url && (
                                <div className="mt-8">
                                    <a 
                                        href={recipe.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                                    >
                                        Se original opskrift ↗
                                    </a>
                                </div>
                            )}
                        </div>
                        
                        {/* Højre kolonne: Ingredienser og Tags (30%) */}
                        <div className="lg:w-[30%] space-y-8">
                            {recipe.ingredients && recipe.ingredients.length > 0 && (
                                <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm sticky top-8">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b border-border/40 pb-3">
                                        <span className="text-primary">🥕</span> Ingredienser
                                    </h2>
                                    <ul className="space-y-3">
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <li key={index} className="flex items-start gap-3 text-sm text-foreground/90">
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                                                <span>{ingredient}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {recipe.tags && recipe.tags.length > 0 && (
                                <div className="bg-muted/30 border border-border/40 rounded-xl p-6">
                                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                        <span className="text-primary">🏷️</span> Tags
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {recipe.tags.map((tag, index) => (
                                            <span 
                                                key={index} 
                                                className="bg-background border border-border/60 text-muted-foreground px-3 py-1 rounded-full text-xs hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
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