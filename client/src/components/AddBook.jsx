import { useQuery } from "@apollo/client"
import { getAuthorsQuery } from "../queries/queries"

export default function AddBook() {
    const {loading, error, data} = useQuery(getAuthorsQuery)

    
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
                    {loading && <option>Loading Authors...</option>}
                    {!loading && data.authors.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
            </div>

            <button type="submit">Add Book</button>
        </form>
    )
}