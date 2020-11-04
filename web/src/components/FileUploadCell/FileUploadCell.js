export const QUERY = gql`
  query {
    authorizationRequest: getAuthorizationRequest {
      authorizationToken
      backblazeApiUrl
      backblazeDownloadUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ authorizationRequest }) => {
  console.log(JSON.stringify(authorizationRequest))
  return JSON.stringify(authorizationRequest)
}
