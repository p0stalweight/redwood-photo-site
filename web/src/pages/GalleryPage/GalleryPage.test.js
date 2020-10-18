import { render } from '@redwoodjs/testing'

import GalleryPage from './GalleryPage'

describe('GalleryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GalleryPage id="42" />)
    }).not.toThrow()
  })
})
