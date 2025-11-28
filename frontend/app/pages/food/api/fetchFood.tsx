import {defineQuery} from 'next-sanity'

export const RECIPES_QUERY = defineQuery(`*[_type == "recipe"] | order(title asc) {
      _id,
      title,
      "image": image.asset->url,
      "tags": tags[]->title,
      "category": category->title,
      rating,
      timeEstimate
}`)

export const RECIPE_QUERY = defineQuery(`*[_type == "recipe" && _id == $recipe][0] {
      _id,
      title,
      "image": image.asset->url,
      description,
      "ingredients": ingredients[].children[].text,
      "tags": tags[]->title,
      "category": category->title,
      timeEstimate,
      rating,
      url
}`)