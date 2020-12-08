export const schema = gql`
  type FileUploadAuth {
    uploadUrl: String!
    authToken: String!
  }
  type Query {
    fileUploadAuth: FileUploadAuth!
  }
`
