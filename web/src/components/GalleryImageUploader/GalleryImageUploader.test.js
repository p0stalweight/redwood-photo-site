import { render } from '@redwoodjs/testing'

import GalleryImageUploader from './GalleryImageUploader'

describe('GalleryImageUploader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GalleryImageUploader />)
    }).not.toThrow()
  })
})
