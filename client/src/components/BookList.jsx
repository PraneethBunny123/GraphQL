import { useQuery, gql } from "@apollo/client"

export const getBooks = gql`
    query {
        books {
            name
            genre
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
                {data.books.map((book, index) => (
                    <li key={index}>{book.name}</li>
                ))}
            </ul>
        </div>
    )
}