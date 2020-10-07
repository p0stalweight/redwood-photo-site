import Photo from 'src/components/Photo'

export const QUERY = gql`
  query FIND_PHOTO_BY_ID($id: Int!) {
    photo: photo(id: $id) {
      id
      order
      imageURL
      createdAt
      galleryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Photo not found</div>

export const Success = ({ photo }) => {
  return <Photo photo={photo} />
}
