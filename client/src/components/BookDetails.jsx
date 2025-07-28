import { useQuery } from "@apollo/client"
import { getSingleBookQuery } from "../queries/queries"

export default function BookDetails() {
    const {data, loading, error} = useQuery(getSingleBookQuery)

    return (
        <div>
            book
        </div>
    )
}