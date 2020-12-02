import { render } from '@redwoodjs/testing'

import GalleryManagePage from './ManageGalleriesPage'

describe('ManageGalleriesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GalleryManagePage />)
    }).not.toThrow()
  })
})
