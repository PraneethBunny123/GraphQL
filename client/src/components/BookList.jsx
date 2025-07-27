import { useQuery } from "@apollo/client"
import AddBook from "./AddBook"
import { getBooksQuery } from "../queries/queries"

export default function BookList() {
    const {loading, error, data} = useQuery(getBooksQuery)

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Something went wrong. {error.message}</p>
    }

    return (
        <div>
            <ul>
                {data.books.map(book => (
                    <li key={book.id}>{book.name}</li>
                ))}
            </ul>
        </div>
    )
}