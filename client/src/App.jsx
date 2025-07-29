import AddBook from './components/AddBook';
import BookList from './components/BookList';

function App() {

    return (
            <div className="min-h-screen bg-accent/10 text-gray-800 p-6 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-accent mb-6">Books App using GraphQL</h1>
                <BookList />
                <AddBook />
            </div>
    )
}

export default App
