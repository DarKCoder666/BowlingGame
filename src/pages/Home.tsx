import React from 'react'
import { Button } from '@material-ui/core';

const Home = ({ history }) => {
  return (
    <div>
      <h1>Welcome to bowling!</h1>
      <h3>Let's start!</h3>
      <div>
        <Button
          onClick={() => { history.push('/game') }}
          variant="outlined"
          color="primary"
          size="large"
        >Start</Button>
      </div>
    </div>
  )
}

export default Home
