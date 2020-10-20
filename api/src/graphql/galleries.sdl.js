export const schema = gql`
  type Gallery {
    id: Int!
    name: String!
    createdAt: DateTime!
    iconImageURL: String!
    photos: [Photo]!
  }

  type Query {
    galleries: [Gallery!]!
    gallery(id: Int!): Gallery
    gallerySize(id: Int!): Int
  }

  input CreateGalleryInput {
    name: String!
    iconImageURL: String!
  }

  input UpdateGalleryInput {
    name: String
    iconImageURL: String
  }

  type Mutation {
    createGallery(input: CreateGalleryInput!): Gallery!
    updateGallery(id: Int!, input: UpdateGalleryInput!): Gallery!
    deleteGallery(id: Int!): Gallery!
  }
`
