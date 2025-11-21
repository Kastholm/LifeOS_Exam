import {client} from '@/app/global/sanity/client'
import {BOOKS_QUERY} from '@/app/pages/books/api/fetchBooks'
import { BookModel } from '@/app/pages/books/model/books'
import AllBooks from './components/all_books'

export default async function PostIndex() {
  const books: BookModel[] = await client.fetch(BOOKS_QUERY)

  return (
    <AllBooks books={books} />
  )
}