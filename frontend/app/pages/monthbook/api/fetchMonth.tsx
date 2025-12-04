import {defineQuery} from 'next-sanity'

export const MONTHBOOKS_QUERY = defineQuery(`*[_type == "monthlyJournal"] | order(title asc) {
      _id,
      date,
      month,
      year
}`)

export const MONTHBOOK_QUERY = defineQuery(`*[_type == "monthlyJournal" && _id == $month][0] {
      _id,
      title,
      date,
      development,
      general,
      month,
      selfDevelopment,
      training,
      work,
      year
}`)