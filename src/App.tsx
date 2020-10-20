import React from 'react'
import { Router, Route, Switch } from "react-router-dom"
import { Container } from '@material-ui/core'
import './App.scss'

import history from './history'
import Home from './pages/Home'
import Game from './pages/Game'

const App = () => {
  return (
    <Router history={history}>
      <Container className="app" >
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/game' exact component={Game} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App
