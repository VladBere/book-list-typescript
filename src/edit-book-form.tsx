import React, { useState } from 'react'
import { BookInterface } from './utils/types'
import { SubmitHandler, useForm } from 'react-hook-form'

interface EditBookFormProps {
  book: BookInterface
  books: BookInterface[]
  setBooks: (books: BookInterface[]) => void
}

export const EditBookForm: React.FC<EditBookFormProps> = ({ book, books, setBooks }) => {

  const [editId, setEditId] = useState<string | null>(null)

  interface FormValues {
    title: string
    author: string
    year: number
    genre: string
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (value) => {
    const updatedBooks = books.map((item) => 
      item.id.toString() === editId ? { ...item,
         title: value.title,
         author: value.author,
         year: value.year,
         genre: value.genre 
        } : item
    )
    
    setBooks(updatedBooks)

    const jsonBooks = JSON.stringify(updatedBooks)
    localStorage.setItem('books', jsonBooks)
    closeForm()
    reset()
  }

  const editBook = (id: string) => {
    setEditId(id)
  }

  const closeForm = () => {
    setEditId(null)
  }

  return (
    <>
      <button
        id={book.id.toString()}
        onClick={() => editBook(book.id.toString())}
      >
        <img
          id={book.id.toString()}
          className="ml-3 bg-violet-600  border-[2px] brightness-125 border-solid border-violet-800 transition p-1 rounded-lg hover:bg-violet-500 hover:border-violet-700"
          src="/assets/icons/pencil.svg"
          alt=""
        />
      </button>
      {editId === book.id.toString() && (
        <form
          id={book.id.toString()}
          className="edit-form ml-3 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            defaultValue={book.title}
            className="border-[2px] mb-1 border-purple-300 border-solid rounded-lg py-1 px-2 bg-purple-50"
            {...register('title', { required: 'Please input title' })}
            type="text"
            placeholder="Call of Ctulhu"
          />
          <span className="text-xs text-red-600 mb-1">{errors.title?.message}</span>
          <input
            defaultValue={book.author}
            className="border-[2px] mb-1 border-purple-300 border-solid rounded-lg py-1 px-2 bg-purple-50"
            {...register('author', { required: 'Please input author' })}
            type="text"
            placeholder="Howard Phillips Lovecraft"
          />
          <span className="text-xs text-red-600 mb-1">{errors.author?.message}</span>
          <input
            defaultValue={book.year}
            className="border-[2px] mb-1 border-purple-300 border-solid rounded-lg py-1 px-2 bg-purple-50"
            {...register('year', { required: 'Please input year' })}
            type="number"
            placeholder="1928"
          />
          <span className="text-xs text-red-600 mb-1">{errors.year?.message}</span>
          <input
            defaultValue={book.genre}
            className="border-[2px] mb-1 border-purple-300 border-solid rounded-lg py-1 px-2 bg-purple-50"
            {...register('genre', { required: 'Please input genre' })}
            type="text"
            placeholder="weird fiction and cosmic horror"
          />
          <span className="text-xs text-red-600 mb-1">{errors.genre?.message}</span>
          <button
            className="border-[2px] border-purple-500 border-solid rounded-lg bg-purple-400 py-2 transition text-purple-950 hover:brightness-110"
            type="submit"
          >
            Edit book
          </button>
        </form>
      )}
    </>
  )
}
