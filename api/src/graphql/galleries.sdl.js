export const schema = gql`
  type Gallery {
    id: Int!
    name: String!
    createdAt: DateTime!
    iconImageURL: String!
    photos: [Photo]!
    size: Int
  }

  type Query {
    galleries: [Gallery!]!
    gallery(id: Int!): Gallery
  }

  input CreateGalleryInput {
    name: String!
    iconImageURL: String!
    photos: [CreatePhotoInput!]
  }

  input UpdateGalleryInput {
    name: String
    iconImageURL: String
    photos: [UpdatePhotoInput!]
  }

  type Mutation {
    createGallery(input: CreateGalleryInput!): Gallery!
    updateGallery(id: Int!, input: UpdateGalleryInput!): Gallery!
    deleteGallery(id: Int!): Gallery!
  }
`
