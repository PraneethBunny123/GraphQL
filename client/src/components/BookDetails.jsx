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
            <p>{data.book.name}</p>
        </div>
    )
}