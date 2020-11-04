import fetch from 'node-fetch'

export const getAuthorizationRequest= async() => {
  let keyID = 'eb0c3dc00973'
  let key = '002f25d1bbbe810922e21b8b64ca0124cf163cf787'
  let encoded = Buffer.from(`${keyID}:${key}`).toString('base64')
  let url = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account'
  const headers = {
    "Authorization": `Basic ${encoded}`
  }

  const response = await fetch(url, {headers: headers})
  const json = await response.json()
  console.log(json)

  return {
    authorizationToken: json.authorizationToken,
    backblazeApiUrl: json.apiUrl,
    backblazeDownloadUrl: json.downloadUrl
  }
}
