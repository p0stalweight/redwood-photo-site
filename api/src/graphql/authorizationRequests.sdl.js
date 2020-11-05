export const schema = gql`
  type AuthorizationRequest {
    id: Int!
    authorizationToken: String!
    backblazeApiUrl: String!
    backblazeDownloadUrl: String!
    backblazeUploadUrl:       String!
    backblazeUploadAuthToken: String!
  }

  type Query {
    getAuthorizationRequest: AuthorizationRequest!
  }

  input CreateAuthorizationRequestInput {
    authorizationToken: String!
    backblazeApiUrl: String!
    backblazeDownloadUrl: String!
    backblazeUploadUrl:       String!
    backblazeUploadAuthToken: String!
  }

  input UpdateAuthorizationRequestInput {
    authorizationToken: String
    backblazeApiUrl: String
    backblazeDownloadUrl: String
    backblazeUploadUrl:       String
    backblazeUploadAuthToken: String
  }
`
