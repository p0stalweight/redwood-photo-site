import fetch from 'node-fetch'

export const fileUploadAuth = async () => {
  /* Initial authorization request */
  const BACKBLAZE_KEY = '002d65353f3fe0c91800c5105445799146fff7f1a3'
  const BACKBLAZE_ID = 'eb0c3dc00973'
  const BUCKET_ID = 'ce0b002c732dcc2070490713'

  const url = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account'
  const encoded = Buffer.from(
    // process.env.BACKBLAZE_ID + ':' + process.env.BACKBLAZE_KEY
    BACKBLAZE_ID + ':' + BACKBLAZE_KEY
  ).toString('base64')

  // eslint-disable-next-line no-irregular-whitespace
  const headers = { Authorization: `Basic ${encoded}` }

  const response = await fetch(url, { headers })
  const { apiUrl, authorizationToken: Authorization } = await response.json()

  /* Request the upload url */
  const uploadRequestUrl = apiUrl + '/b2api/v2/b2_get_upload_url'
  const uploadRequestBody = JSON.stringify({
    // bucketId: process.env.BUCKET_ID,
    bucketId: BUCKET_ID,
  })

  const uploadResponse = await fetch(uploadRequestUrl, {
    method: 'Post',
    headers: { Authorization },
    body: uploadRequestBody,
  })

  const { uploadUrl, authorizationToken } = await uploadResponse.json()

  return { uploadUrl, authToken: authorizationToken }
}
