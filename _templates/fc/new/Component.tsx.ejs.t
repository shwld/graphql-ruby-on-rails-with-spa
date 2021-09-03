---
to: <%= absPath %>/<%= componentName %>.tsx
force: true
---
import React from 'react'
<% if (haveHooks) { -%>
import { useDependencies } from './dependencies'
<% } -%>

type Props = {
//  children?: React.ReactNode
}

export const <%= componentName %>: <%- typeAnnotate %> = <%= props %> => {
<% if (haveHooks) { -%>
  const deps = useDependencies<%= props %>
<% } -%>
  return (
    <<%= tag %>>
    </<%= tag %>>
  )
}
