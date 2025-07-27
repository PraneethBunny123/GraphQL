import { useQuery, gql } from "@apollo/client"
import AddBook from "./AddBook"

export const getBooks = gql`
    query {
        books {
            name
            genre
            id
        }
    }
`

export default function BookList() {
    const {loading, error, data} = useQuery(getBooks)

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