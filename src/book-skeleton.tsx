import React from "react";
import { BookInterface } from "./utils/types";
import { EditBookForm } from "./edit-book-form";

interface BookSkeletonProps {
  book: BookInterface;
  books: BookInterface[];
  setBooks: (books: BookInterface[]) => void;
}

export const BookSkeleton: React.FC<BookSkeletonProps> = ({
  book,
  books,
  setBooks,
}) => {
  const deleteBook = () => {
    const jsonBooks = localStorage.getItem("books");
    let books: BookInterface[] = [];

    if (jsonBooks) {
      try {
        books = JSON.parse(jsonBooks);
      } catch (error) {
        console.error("Error", error);
      }
    }
    const newBooks = books.filter(
      (item) => item.id.toString() !== book.id.toString()
    );
    setBooks(newBooks);
    localStorage.setItem("books", JSON.stringify(newBooks));
  };

  return (
    <div className="border-[2px] border-solid ml-5 my-3 flex items-center justify-center border-purple-200 min-w-96 text-center text-purple-950 rounded-xl divst-none py-2 px-5 bg-purple-50">
      <div className="min-w-72">
        <h2>
          {book.title} | {book.author}
        </h2>
        <p>
          {book.genre} | {book.year} year
        </p>
      </div>
      <button
        onClick={() => {
          deleteBook();
        }}
        className="bg-purple-800 border-[2px] brightness-125 border-solid border-purple-950 transition p-1 rounded-lg ml-3 hover:brightness-150"
      >
        <img
          className="brightness-75"
          id={book.id.toString()}
          src="/assets/icons/trash-2.svg"
          alt=""
        />
      </button>
      <EditBookForm book={book} books={books} setBooks={setBooks} />
    </div>
  );
};
