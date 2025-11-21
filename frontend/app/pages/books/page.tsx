import {client} from '@/app/global/sanity/client'
import {BOOKS_QUERY} from '@/app/pages/books/api/fetchBooks'
import { BookModel } from '@/app/pages/books/model/books'
import Link from 'next/link'

export default async function PostIndex() {
  const books: BookModel[] = await client.fetch(BOOKS_QUERY)

  return (
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          <Link href={`/pages/books/${book?.number}`}>{book?.title}</Link>
        </li>
      ))}
    </ul>
  )
}