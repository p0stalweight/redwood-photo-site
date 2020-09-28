import { render } from '@redwoodjs/testing'

import NavLink from './NavLink'

describe('NavLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavLink />)
    }).not.toThrow()
  })
})
