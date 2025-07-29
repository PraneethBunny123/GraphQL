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
            <h3 className="text-2xl font-semibold text-accent mb-2">{data.book.name}</h3>
            <p className="mb-1"><span className="font-medium">Genre:</span> {data.book.genre}</p>
            <p className="mb-4"><span className="font-medium">Author:</span> {data.book.author.name}</p>

            <p className="font-medium mb-2">Other books by this author:</p>
            <ul className="list-disc list-inside space-y-1">
                {data.book.author.books.map((book) => (
                    <li key={book.id}>{book.name}</li>
                ))}
            </ul>
        </div>
    );
}
