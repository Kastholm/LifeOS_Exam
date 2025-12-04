import Link from "next/link";
import { RecipeModel } from "../model/recipes";
import { Utensils, Info } from "lucide-react";

export default function AllRecipes(props: { recipes: RecipeModel[] }) {
    const { recipes } = props
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {recipes.map((recipe) => (
                    <div
                        key={recipe._id}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl bg-card"
                        style={{ aspectRatio: '2/3' }}
                    >
                        {recipe.image ? (
                            <>
                                <img 
                                    src={recipe.image}
                                    alt={recipe.title ?? "Recipe cover"}
                                    className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-black" />
                            </>
                        ) : (
                            <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
                                <Utensils className="w-16 h-16 text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-300" />
                            </div>
                        )}

                        <div className="relative z-10 flex flex-1 flex-col justify-end p-4 text-foreground">
                            <div className="flex items-center justify-between mb-auto pb-3">
                                {recipe.category && (
                                    <span className="rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-foreground shadow-lg">
                                        {recipe.category}
                                    </span>
                                )}
                                {recipe.timeEstimate && (
                                    <span className="rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-foreground shadow-lg">
                                        {recipe.timeEstimate}min
                                    </span>
                                )}
                            </div>

                            <div className="mb-3">
                                <h2 className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-lg mb-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                                    {recipe.title}
                                </h2>
                                {recipe.rating && (
                                    <p className="text-xs text-white/80 drop-shadow-md flex items-center gap-1">
                                        ⭐ {recipe.rating}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-end">
                                <Link 
                                    href={`/pages/food/${recipe._id}`}
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