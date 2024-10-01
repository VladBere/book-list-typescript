import { BookSkeleton } from "./book-skeleton";
import { BookInterface } from "./utils/types";

interface BookFormProps {
  books: BookInterface[];
  setBooks: (books: BookInterface[]) => void;
}

export const BookList: React.FC<BookFormProps> = ({ books, setBooks }) => {
  const jsonBooks = localStorage.getItem("books");
  let parsedBooks: BookInterface[] = [];

  if (jsonBooks) {
    try {
      parsedBooks = JSON.parse(jsonBooks);
    } catch (error) {
      console.error("Error", error);
    }
  }
  return (
    <ul>
      {parsedBooks.map((book: BookInterface) => (
        <li key={book.id}>
          <BookSkeleton books={books} book={book} setBooks={setBooks} />
        </li>
      ))}
    </ul>
  );
};
