import { render } from '@redwoodjs/testing/web'

import DefaultLayout from './DefaultLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DefaultLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DefaultLayout />)
    }).not.toThrow()
  })
})
