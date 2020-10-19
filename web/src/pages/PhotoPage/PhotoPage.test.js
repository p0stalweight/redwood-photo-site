import { render } from '@redwoodjs/testing'

import PhotoPage from './PhotoPage'

describe('PhotoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PhotoPage id="42" />)
    }).not.toThrow()
  })
})
