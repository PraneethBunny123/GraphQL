import { useQuery, useMutation } from "@apollo/client";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";
import { useState } from "react";

export default function AddBook() {
    const { loading, error, data } = useQuery(getAuthorsQuery);

    const [addBook, { data: addBookData, loading: addBookLoading, error: addBookError }] = useMutation(addBookMutation, {
        refetchQueries: [getBooksQuery],
    });

    const [formData, setFormData] = useState({
        name: '',
        genre: '',
        authorId: '',
    });

    function handleOnChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        addBook({
            variables: {
            name: formData.name,
            genre: formData.genre,
            authorId: formData.authorId,
            },
        });

        setFormData({
            name: '',
            genre: '',
            authorId: '',
        });
    }

    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} id="add-book">
                <div className="field">
                    <label >Book Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="field">
                    <label >Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="field">
                    <label >Author</label>
                    <select
                        name="authorId"
                        value={formData.authorId}
                        onChange={handleOnChange}
                        required
                    >
                        <option value="">-- Select Author --</option>
                        {loading && <option disabled>Loading Authors...</option>}
                        {!loading &&
                            data?.authors?.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                            ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={addBookLoading}
                    className="w-full bg-accent text-white py-2 rounded-md font-medium hover:bg-accent/90 transition"
                >
                    {addBookLoading ? "Adding..." : "Add Book"}
                </button>
            </form>

            {addBookLoading && <p className="mt-4 text-gray-600">Adding book...</p>}
            {addBookError && <p className="mt-4 text-red-600">Error: {addBookError.message}</p>}
            {addBookData && (
            <p className="mt-4 text-green-600">
                Book added: <strong>{addBookData.addBook.name}</strong> (ID: {addBookData.addBook.id})
            </p>
            )}
        </div>
    );
}
