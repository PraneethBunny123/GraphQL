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
    
    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Book Name:</label><br />
                <input
                    type="text"
                    name="name"
                />
            </div>

            <div>
                <label>Genre:</label><br />
                <input
                    type="text"
                    name="genre"
                />
            </div>

            <div>
                <label>Author:</label><br />
                <select name="role">
                    <option value="">-- Select Author --</option>
                </select>
            </div>

            <button type="submit">Add Book</button>
        </form>
    )
}