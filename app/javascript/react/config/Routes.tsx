import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Chat } from '../pages/Chat'
import { Index } from '../pages/Index'

type Props = {}

// type State = {}

export const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route exact path="/chat">
        <Chat />
      </Route>
      <Route path="/">
        <Index />
      </Route>
    </Switch>
  )
}
