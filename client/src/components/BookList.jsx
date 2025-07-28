import { useQuery } from "@apollo/client"
import { getBooksQuery } from "../queries/queries"
import BookDetails from "./BookDetails"
import { useState } from "react"

export default function BookList() {
    const {loading, error, data} = useQuery(getBooksQuery)
    const [id, setId] = useState()

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Something went wrong. {error.message}</p>
    }

    function handleBookClick(id) {
        setId(id)
    }

    return (
        <div>
            <ul>
                {data.books.map(book => (
                    <li key={book.id}>
                        <button onClick={() => handleBookClick(book.id)}>{book.name}</button>
                    </li>
                ))}
            </ul>
            {id && <BookDetails id={id}/>}
        </div>
    )
}