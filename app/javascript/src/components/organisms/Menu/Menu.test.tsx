import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { create } from 'react-test-renderer'

import { MenuTemplate } from './Menu'

describe('Organisms/Menu', () => {
  it('Snap Shot', () => {
    const component = create(
      <MemoryRouter>
        <MenuTemplate currentUser={{ id: 'test', email: 'test@example.com' }} />
      </MemoryRouter>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
