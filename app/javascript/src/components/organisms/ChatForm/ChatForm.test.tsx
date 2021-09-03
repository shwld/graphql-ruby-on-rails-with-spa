import React from 'react'
import { create } from 'react-test-renderer'

import { ChatFormTemplate } from './ChatForm'

describe('Organisms/ChatForm', () => {
  it('Snap Shot', () => {
    const component = create(<ChatFormTemplate onSubmit={jest.fn()} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
