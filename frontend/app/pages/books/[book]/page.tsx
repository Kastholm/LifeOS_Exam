import { client } from "@/app/global/sanity/client"
import { BOOK_QUERY } from "../api/fetchBooks"
import { BookModel } from "../model/books"

export default async function BookPage({ params }: { params: { book: string } }) {
    const { book } = await params
    const bookNumber = Number(book)
    const bookData: BookModel = await client.fetch(BOOK_QUERY, { book: bookNumber })
    return <div>BookPage this is the book page {bookData.title}</div>
}