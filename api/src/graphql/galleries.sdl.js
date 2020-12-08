export const schema = gql`
  type Gallery {
    id: Int!
    name: String!
    tripDate: DateTime!
    latitude: Float!
    longitude: Float!
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
    tripDate: DateTime!
    latitude: Float!
    longitude: Float!
    iconImageURL: String!
    photos: [CreatePhotoInput!]
  }

  input UpdateGalleryInput {
    name: String
    iconImageURL: String
    photos: [UpdatePhotoInput!]
  }

  input ChangeGalleryInput {
    name: String
    iconImageURL: String
    latitude: Float
    longitude: Float
    tripDate: DateTime!
  }

  type Mutation {
    createGallery(input: CreateGalleryInput!): Gallery!
    updateGallery(id: Int!, input: UpdateGalleryInput!): Gallery!
    changeGallery(id: Int!, input: ChangeGalleryInput!): Gallery!
    deleteGallery(id: Int!): Gallery!
  }
`
