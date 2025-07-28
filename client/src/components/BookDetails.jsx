import { useQuery } from "@apollo/client"
import { getSingleBookQuery } from "../queries/queries"

export default function BookDetails({id}) {
    const {data, loading, error} = useQuery(getSingleBookQuery, {variables: {id: id}})
    

    if(loading) {
        return <p>Loading Book details...</p>
    }
    
    if(error) {
        return <p>Failed to get the book details.</p>
    }

    return (
        <div>
            <h3>{data.book.name}</h3>
            <p>{data.book.genre}</p>
            <p>{data.book.author.name}</p>
            <p>All books by this author:</p>
            <ul>
                {data.book.author.books.map(book => (
                    <li key={book.id}>{book.name}</li>
                ))}
            </ul>
        </div>
    )
}