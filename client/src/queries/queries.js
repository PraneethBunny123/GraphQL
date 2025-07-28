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

export const getSingleBookQuery = gql`
    query GetBook($id: ID!){
        book(id: $id) {
            id
            name 
            genre
            author {
                id
                name
                age
                books {
                    name
                    genre
                    id
                }
            }
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
