import { useQuery } from "@apollo/client"
import { getSingleBookQuery } from "../queries/queries"

export default function BookDetails({id}) {
    const {data, loading, error} = useQuery(getSingleBookQuery, {variables: {id: id}})
    console.log(data)

    return (
        <div>
            book
        </div>
    )
}