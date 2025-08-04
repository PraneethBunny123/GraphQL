import { useQuery } from "@apollo/client";
import { getSingleBookQuery } from "../queries/queries";

export default function BookDetails({ id }) {

    const { data, loading, error } = useQuery(getSingleBookQuery, {
        variables: { id },
    });

    if (!id) {
        return (
            <div id="book-details">
                <p>No book was selected.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div id="book-details">
                <p>Loading book details...</p>
            </div>
        );
    }

    if (error || !data?.book) {
        return (
            <div id="book-details">
                <p>Failed to get the book details.</p>
            </div>
        );
    }

    return (
        <div id="book-details">
            <h3>{data.book.name}</h3>
            <p><strong>Genre:</strong> {data.book.genre}</p>
            <p><strong>Author:</strong> {data.book.author.name}</p>
            <p><strong>All books by this author:</strong></p>
            <ul>
                {data.book.author.books.map(book => (
                    <li key={book.id}>{book.name}</li>
                ))}
            </ul>
        </div>
    );
}
