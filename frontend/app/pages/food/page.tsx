import {client} from '@/app/global/sanity/client'
import {RECIPES_QUERY} from './api/fetchFood'
import { RecipeModel } from './model/recipes'
import AllRecipes from './components/all_recipes'
export const revalidate = 3600; // 1 hour

export default async function PostIndex() {
  const recipes: RecipeModel[] = await client.fetch(RECIPES_QUERY)

  return (
    <AllRecipes recipes={recipes} />
  )
}