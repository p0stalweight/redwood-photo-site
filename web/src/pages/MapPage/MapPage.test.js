import { render } from '@redwoodjs/testing'

import MapPage from './MapPage'

describe('MapPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MapPage />)
    }).not.toThrow()
  })
})
