import BookList from "./components/BookList.jsx"
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// const client = new ApolloClient({
//     uri: "http://localhost:4000/graphql"
// })

function App() {

    return (
        <div id="main">
            <h1>Ninja</h1>
            <BookList />
        </div>
    )
}

export default App
