---
to: <%= absPath %>/<%= componentName %>.test.tsx
force: true
---
import React from 'react'
import { create } from 'react-test-renderer'

import { <%= componentName %> } from './<%= componentName %>'

describe('<%= category %>/<%= componentName %>', () => {
  it('Snap Shot', () => {
    const component = create(<<%= componentName %> />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
