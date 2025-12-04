import {defineQuery} from 'next-sanity'

export const BOOKS_QUERY = defineQuery(`*[_type == "book"] | order(number desc) {
      _id,
      number,
      title,
      "image": image.asset->url,
      date,
      completed,
      notes
}`)

export const BOOK_QUERY = defineQuery(`*[_type == "book" && number == $book][0] {
      _id,
      number,
      title,
      "image": image.asset->url,
      date,
      completed,
      notes
}`)