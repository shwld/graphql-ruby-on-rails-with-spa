import React from 'react'
import { create } from 'react-test-renderer'

import { CommentListTemplate } from './CommentList'

describe('Organisms/CommentList', () => {
  it('Snap Shot', () => {
    const component = create(<CommentListTemplate messages={['message']} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
