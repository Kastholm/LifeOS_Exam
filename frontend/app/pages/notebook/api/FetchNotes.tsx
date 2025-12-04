import {defineQuery} from 'next-sanity'

export const NOTES_QUERY = defineQuery(`*[_type == "note"] | order(startDate desc) {
      _id,
      title,
      "image": image.asset->url,
      startDate,
      content
}`)

export const NOTE_QUERY = defineQuery(`*[_type == "note" && _id == $noteId][0] {
      _id,
      title,
      "image": image.asset->url,
      startDate,
      content
}`)

