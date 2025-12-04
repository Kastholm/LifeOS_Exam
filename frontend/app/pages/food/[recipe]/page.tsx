import { client } from "@/app/global/sanity/client"
import { RECIPE_QUERY } from "../api/fetchFood"
import { RecipeModel } from "../model/recipes"
import SingularRecipe from "../components/singular_recipe"

export const revalidate = 3600; // 1 hour

export default async function RecipePage({ params }: { params: { recipe: string } }) {
    const { recipe } = await params
    const recipeData: RecipeModel = await client.fetch(RECIPE_QUERY, { recipe: recipe })
    return <SingularRecipe recipe={recipeData} />
}