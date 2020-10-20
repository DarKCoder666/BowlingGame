import React, { useState } from 'react'
import PlayersFields from '../components/player/PlayersFields'
import Bowling from '../components/bowling/Bowling'
import { IPlayer } from '../types/player.type'

const Game: React.FC = () => {
  const [players, setPlayers] = useState<IPlayer[]>([])
  const [step, setStep] = useState<Number>(0)

  const nextStep = () => {
    setStep(step + 1)
  }

  let renderContent
  switch (step) {
    case 0:
      renderContent = <PlayersFields
        name="players"
        data={players}
        setData={setPlayers}
        nextStep={nextStep}
      />
      break
    case 1:
      renderContent = <Bowling players={players} />
      break
    default:
      renderContent = <div>No such stage</div>
  }

  return (
    <div>
      {renderContent}
    </div>
  )
}

export default Game