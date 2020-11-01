import { render } from '@redwoodjs/testing'

import GalleryPhotoPage from './GalleryPhotoPage'

describe('GalleryPhotoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GalleryPhotoPage />)
    }).not.toThrow()
  })
})
