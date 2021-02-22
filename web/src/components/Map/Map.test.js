import { render } from '@redwoodjs/testing'

import Map from './Map'

describe('Map', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Map />)
    }).not.toThrow()
  })
})
