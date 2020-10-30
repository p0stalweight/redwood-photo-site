import Gallery from 'src/components/Gallery'

export const QUERY = gql`
  query FIND_GALLERY_BY_ID($id: Int!) {
    gallery: gallery(id: $id) {
      id
      name
      createdAt
      iconImageURL
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Gallery not found</div>

export const Success = ({ gallery }) => {
  return <Gallery gallery={gallery} />
}
