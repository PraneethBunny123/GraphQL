import { useQuery, gql } from "@apollo/client"

export const getBooks = gql`
    query {
        authors {
            name
            age
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
                {data.authors.map((book, index) => (
                    <li key={index}>{book.name}</li>
                ))}
            </ul>
        </div>
    )
}