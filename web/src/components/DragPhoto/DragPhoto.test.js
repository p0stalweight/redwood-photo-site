import { render } from '@redwoodjs/testing'

import DragPhoto from './DragPhoto'

describe('DragPhoto', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DragPhoto />)
    }).not.toThrow()
  })
})
