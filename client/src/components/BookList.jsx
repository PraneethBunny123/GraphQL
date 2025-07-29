import { useQuery } from "@apollo/client"
import { getBooksQuery } from "../queries/queries"
import BookDetails from "./BookDetails"
import { useState } from "react"

export default function BookList() {
    const {loading, error, data} = useQuery(getBooksQuery)
    const [id, setId] = useState()

    if(loading) {
        return <p className="text-gray-600">Loading...</p>
    }

    if(error) {
        return <p className="text-red-600">Something went wrong. {error.message}</p>
    }

    function handleBookClick(id) {
        setId(id)
    }

    return (
        <div >
            <ul id="book-list">
                {data.books.map(book => (
                    <li key={book.id} onClick={() => handleBookClick(book.id)}>
                            
                            {book.name}
                    </li>
                ))}
            </ul>
            {id && 
                <div>
                    <BookDetails id={id}/>
                </div>
            }
        </div>
    )
}