import { SubmitHandler, useForm } from "react-hook-form";
import { BookInterface } from "./utils/types";

    interface BookFormProps {
        books: BookInterface[],
        setBooks: (books: BookInterface[]) => void;
    }

 export const BookForm: React.FC<BookFormProps>  = ({books, setBooks}) => {

    interface FormValues {
        title: string,
        author: string,
        year: number,
        genre: string,
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<FormValues>()

      const onSubmit: SubmitHandler<FormValues> = (value) => {
        const addedBook: BookInterface = {
            title: value.title,
            author: value.author,
            genre: value.genre,
            year: value.year,
            id: Math.random(),
        }
    
        const updatedBooks = [...books, addedBook]
        setBooks(updatedBooks)
    
        const jsonBooks = JSON.stringify(updatedBooks)
        localStorage.setItem('books', jsonBooks)
        reset()
    }
      
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input className="border-[2px] mb-1 border-purple-300 border-solid rounded-lg py-1 px-2 bg-purple-50" {...register("title", {required: "Please input title"})} type="text" placeholder="Call of Ctulhu"/>
      <span className="text-xs text-red-600 mb-1">{errors.title?.message}</span>
      <input className="border-[2px] mb-1 border-purple-300 border-solid rounded-lg py-1 px-2 bg-purple-50" {...register("author", {required: "Please input author"})} type="text" placeholder="Howard Phillips Lovecraft"/>
      <span className="text-xs text-red-600 mb-1">{errors.author?.message}</span>
      <input className="border-[2px] mb-1 border-purple-300 border-solid rounded-lg py-1 px-2 bg-purple-50" {...register("year", {required: "Please input year"})} type="number" placeholder="1928"/>
      <span className="text-xs text-red-600 mb-1">{errors.year?.message}</span>
      <input className="border-[2px] mb-1 border-purple-300 border-solid rounded-lg py-1 px-2 bg-purple-50" {...register("genre", {required: "Please input genre"})} type="text" placeholder="weird fiction and cosmic horror"/>
      <span className="text-xs text-red-600 mb-1">{errors.genre?.message}</span>
      <button className="border-[2px] border-purple-500 border-solid rounded-lg bg-purple-400 py-2 transition  text-purple-950 hover:brightness-110" type="submit">Add book</button>
    </form>
  )
}