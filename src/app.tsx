import { useEffect, useState } from "react"
import { BookList } from "./book-list"
import { BookForm } from "./book-form"
import { BookInterface } from "./utils/types"

export const App = () => {
  const [books, setBooks] = useState<BookInterface[]>([])

  useEffect(() => {
    const storedBooks = localStorage.getItem("books")
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks))
    }
  }, [])

  return (
    <div className="flex h-screen items-center justify-center">
      <BookForm books={books} setBooks={setBooks} />
      <BookList books={books} setBooks={setBooks} />
    </div>
  )
}
