export const schema = gql`
  type Photo {
    id: Int!
    order: Int!
    imageURL: String!
    createdAt: DateTime!
    gallery: Gallery!
    galleryId: Int!
  }

  type Query {
    photos: [Photo!]!
    photo(id: Int!): Photo
  }

  input CreatePhotoInput {
    order: Int!
    imageURL: String!
    galleryId: Int!
  }

  input UpdatePhotoInput {
    order: Int
    imageURL: String
    galleryId: Int
  }

  type Mutation {
    createPhoto(input: CreatePhotoInput!): Photo!
    updatePhoto(id: Int!, input: UpdatePhotoInput!): Photo!
    deletePhoto(id: Int!): Photo!
  }
`