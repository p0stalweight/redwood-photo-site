import { Link, routes } from '@redwoodjs/router'

const MapPage = () => {
  return (
    <>
      <h1>MapPage</h1>
      <p>
        Find me in <code>./web/src/pages/MapPage/MapPage.js</code>
      </p>
      <p>
        My default route is named <code>map</code>, link to me with `
        <Link to={routes.map()}>Map</Link>`
      </p>
    </>
  )
}

export default MapPage
