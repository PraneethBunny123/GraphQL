import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
})

// to check the data retrieval form backend

// client.query({
//   query: gql`
//     query {
//       books {
//         name
//         genre
//       }
//     }
//   `
// }).then((result) => console.log(result))
//   .catch((err) => console.error("GraphQL error:", err));


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
