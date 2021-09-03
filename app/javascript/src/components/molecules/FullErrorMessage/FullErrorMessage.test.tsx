import React from 'react'
import { create } from 'react-test-renderer'

import { FullErrorMessage } from './FullErrorMessage'

describe('Molecules/FullErrorMessage', () => {
  it('Snap Shot', () => {
    const component = create(<FullErrorMessage />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
