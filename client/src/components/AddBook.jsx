import { useQuery, useMutation } from "@apollo/client"
import { getAuthorsQuery, addBookMutation } from "../queries/queries"
import { useState } from "react"

export default function AddBook() {
    const {loading, error, data} = useQuery(getAuthorsQuery)

    const [addBook, {data: addBookData, loading: addBookLoading, error: addBookError}] = useMutation(addBookMutation)

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

        addBook({
            variables: {
                name: formData.name,
                genre: formData.genre,
                authorId: formData.authorId
            }
        })

        setFormData({
            name: '',
            genre: '',
            authorId: ''
        })
    }

    return (
        <>
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
        {addBookLoading && <p>Adding book...</p>}
        {addBookError && <p style={{color: 'red'}}>Error: {addBookError.message}</p>}
        {addBookData && <p style={{color: 'green'}}>Book added: {addBookData.addBook.name} with id: {addBookData.addBook.id}  </p>}
        </>
    )
}