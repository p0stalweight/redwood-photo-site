import { Button } from "@chakra-ui/core"

export const QUERY = gql`
  query {
    authorizationRequest: getAuthorizationRequest {
      authorizationToken
      backblazeApiUrl
      backblazeDownloadUrl
    }
  }
`

const submitImage = () => {
 alert("image submitted in FileUploadCell")
}



export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ authorizationRequest }) => {
  console.log(JSON.stringify(authorizationRequest))
  return <div> {JSON.stringify(authorizationRequest)}
  <p> Testing Cell stuff </p>
  <Button onClick={() => submitImage()}> Submit Image</Button>
  </div>

}
