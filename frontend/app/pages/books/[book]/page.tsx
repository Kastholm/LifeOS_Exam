import { client } from "@/app/global/sanity/client"
import { BOOK_QUERY } from "../api/fetchBooks"
import { BookModel } from "../model/books"
import SingularBook from "../components/singular_book"

export default async function BookPage({ params }: { params: { book: string } }) {
    const { book } = await params
    const bookNumber = Number(book)
    const bookData: BookModel = await client.fetch(BOOK_QUERY, { book: bookNumber })
    return <SingularBook book={bookData} />
}