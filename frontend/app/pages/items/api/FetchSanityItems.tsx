import {defineQuery} from 'next-sanity'

export const ITEMS_QUERY = defineQuery(`*[_type == "item"] | order(name asc) {
      _id,
      name,
      quantity,
      category->,
      location->,
      description,
      value,
      forSale,
      image,
      purchaseDate,
      purchasePrice
}`)