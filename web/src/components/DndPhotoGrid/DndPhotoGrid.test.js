import { render } from '@redwoodjs/testing'

import DndPhotoGrid from './DndPhotoGrid'

describe('DndPhotoGrid', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DndPhotoGrid />)
    }).not.toThrow()
  })
})
