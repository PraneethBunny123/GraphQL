import AddBook from './components/AddBook';
import BookList from './components/BookList';

function App() {

    return (
            <div id='main'>
                <h1 className="text-4xl font-bold text-accent mb-6">Books App using GraphQL</h1>
                <BookList />
                <AddBook />
            </div>
    )
}

export default App
