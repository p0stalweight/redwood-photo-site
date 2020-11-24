import { Link, routes } from '@redwoodjs/router'

const GalleryEditPage = () => {
  return (
    <>
      <h1>GalleryEditPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/GalleryEditPage/GalleryEditPage.js</code>
      </p>
      <p>
        My default route is named <code>galleryEdit</code>, link to me with `
        <Link to={routes.galleryEdit()}>GalleryEdit</Link>`
      </p>
    </>
  )
}

export default GalleryEditPage
