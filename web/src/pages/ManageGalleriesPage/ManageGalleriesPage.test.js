import { render } from '@redwoodjs/testing'

import GalleryManagePage from './GalleryManagePage'

describe('GalleryManagePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GalleryManagePage />)
    }).not.toThrow()
  })
})
