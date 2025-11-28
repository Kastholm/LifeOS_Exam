import Link from "next/link";
import Image from "next/image";
import { RecipeModel } from "../model/recipes";

export default function AllRecipes(props: { recipes: RecipeModel[] }) {
    const { recipes } = props
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Alle Opskrifter</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                    <Link 
                        key={recipe._id} 
                        href={`/pages/food/${recipe._id}`}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg"
                    >
                        <div className="h-0.5 w-full bg-linear-to-r from-primary/70 via-primary to-primary/60 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                        {recipe.image && (
                            <div className="relative mx-4 mt-4 rounded-xl border border-border/40 bg-card/80 shadow-sm ring-1 ring-white/5 backdrop-blur overflow-hidden">
                                <Image
                                    alt={recipe.title ?? "Recipe cover"}
                                    width={300}
                                    height={600}
                                    src={recipe.image}
                                    className="h-52 w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                                />
                            </div>
                        )}
                        <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-5 text-foreground">
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                                
                                {recipe.timeEstimate && (
                                    <span className="font-medium text-muted-foreground/70">
                                        {recipe.timeEstimate} minutter
                                    </span>
                                )}
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary">
                                    {recipe.title}
                                </h2>
                                {recipe.rating && (
                                    <span className="text-xs text-white bg-amber-800 px-2 py-1 rounded-full w-fit font-medium flex items-center gap-1">
                                        {recipe.rating} ⭐
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}