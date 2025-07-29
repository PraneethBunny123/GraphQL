import { useQuery } from "@apollo/client";
import { getSingleBookQuery } from "../queries/queries";

export default function BookDetails({ id }) {
    const { data, loading, error } = useQuery(getSingleBookQuery, { variables: { id } });

    if (loading) {
        return <p className="text-gray-600">Loading book details...</p>;
    }

    if (error) {
        return <p className="text-red-600">Failed to get the book details.</p>;
    }

    return (
        <div id="book-details">
            <h3 >{data.book.name}</h3>
            <p ><span className="font-medium">Genre:</span> {data.book.genre}</p>
            <p ><span className="font-medium">Author:</span> {data.book.author.name}</p>

            <p >Other books by this author:</p>
            <ul >
                {data.book.author.books.map((book) => (
                    <li key={book.id}>{book.name}</li>
                ))}
            </ul>
        </div>
    );
}
