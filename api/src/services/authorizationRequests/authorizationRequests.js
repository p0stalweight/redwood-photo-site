import fetch from 'node-fetch'

export const getAuthorizationRequest = async() => {
  /* Initial authorization request */
  let keyID = 'eb0c3dc00973'
  let key = '002d65353f3fe0c91800c5105445799146fff7f1a3'
  let encoded = Buffer.from(`${keyID}:${key}`).toString('base64')
  let url = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account'
  const headers = {
    "Authorization": `Basic ${encoded}`
  }

  const response = await fetch(url, {headers: headers})
  const authorizationJson = await response.json()

  /* Request the upload url */
  let bucketId = 'ce0b002c732dcc2070490713'
  let uploadRequestUrl = await authorizationJson.apiUrl + '/b2api/v2/b2_get_upload_url'
  const uploadRequestHeaders = await {Authorization: `${authorizationJson.authorizationToken}`}
  const uploadRequestBody = JSON.stringify({ bucketId: `${bucketId}` })

  const uploadResponse = await fetch(uploadRequestUrl, {method: 'Post', headers: uploadRequestHeaders, body: uploadRequestBody})
  const uploadJson = await uploadResponse.json()

  return {
    authorizationToken: authorizationJson.authorizationToken,
    backblazeApiUrl: authorizationJson.apiUrl,
    backblazeDownloadUrl: authorizationJson.downloadUrl,
    backblazeUploadUrl: uploadJson.uploadUrl,
    backblazeUploadAuthToken: uploadJson.authorizationToken
  }
}
