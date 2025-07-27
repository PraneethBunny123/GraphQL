import { useQuery, gql } from "@apollo/client"

export const getAuthorsQuery = gql`
    query {
        authors {
            name
            id
        }
    }
`

export default function AddBook() {
    const {data} = useQuery(getAuthorsQuery)
    console.log(data)

    return (
        <div>
            
        </div>
    )
}