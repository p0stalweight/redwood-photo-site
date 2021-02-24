import { render } from '@redwoodjs/testing'

import AdminMap from './AdminMap'

describe('AdminMap', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminMap />)
    }).not.toThrow()
  })
})
