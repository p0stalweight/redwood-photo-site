import { render } from '@redwoodjs/testing'

import GalleryUploadForm from './GalleryUploadForm'

describe('GalleryUploadForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GalleryUploadForm />)
    }).not.toThrow()
  })
})
