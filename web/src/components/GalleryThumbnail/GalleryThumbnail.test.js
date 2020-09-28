import { render } from '@redwoodjs/testing'

import GalleryPreview from './GalleryPreview'

describe('GalleryPreview', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GalleryPreview />)
    }).not.toThrow()
  })
})
