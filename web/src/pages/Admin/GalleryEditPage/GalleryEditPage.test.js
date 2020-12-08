import { render } from '@redwoodjs/testing'

import GalleryEditPage from './GalleryEditPage'

describe('GalleryEditPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GalleryEditPage />)
    }).not.toThrow()
  })
})
