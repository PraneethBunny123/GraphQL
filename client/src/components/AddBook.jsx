import { useQuery } from "@apollo/client"
import { getAuthorsQuery } from "../queries/queries"
import { useState } from "react"

export default function AddBook() {
    const {loading, error, data} = useQuery(getAuthorsQuery)

    const [formData, setFormData] = useState({
        name: '',
        genre: '',
        authorId: ''
    })

    function handleOnChange(e) {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}))
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        setFormData({
            name: '',
            genre: '',
            authorId: ''
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Book Name:</label><br />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                    required
                />
            </div>

            <div>
                <label>Genre:</label><br />
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleOnChange}
                    required
                />
            </div>

            <div>
                <label>Author:</label><br />
                <select 
                    name="authorId"
                    value={formData.authorId}
                    onChange={handleOnChange}  
                    required  
                >
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