import { gql } from "@apollo/client"

export const getBooksQuery = gql`
    query {
        books {
            name
            genre
            id
        }
    }
`

export const getAuthorsQuery = gql`
    query {
        authors {
            name
            id
        }
    }
`

export const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            id
            name
        }
    }
`