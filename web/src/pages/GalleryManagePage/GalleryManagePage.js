import { Link, routes } from '@redwoodjs/router'

const GalleryManagePage = () => {
  return (
    <>
      <h1>GalleryManagePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/GalleryManagePage/GalleryManagePage.js</code>
      </p>
      <p>
        My default route is named <code>galleryManage</code>, link to me with `
        <Link to={routes.galleryManage()}>GalleryManage</Link>`
      </p>
    </>
  )
}

export default GalleryManagePage
