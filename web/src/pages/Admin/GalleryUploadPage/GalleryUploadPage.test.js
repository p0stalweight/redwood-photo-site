import { render } from '@redwoodjs/testing'

import GalleryUploadPage from './GalleryUploadPage'

describe('GalleryUploadPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GalleryUploadPage />)
    }).not.toThrow()
  })
})
