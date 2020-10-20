import React, { useState } from 'react'
import PlayerField from './PlayerField'
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { IPlayer } from '../../types/player.type'
import './PlayerFields.scss'

const PlayersFields = ({ data, setData, name, nextStep }: { data: IPlayer[], setData: Function, name: string, nextStep: Function }) => {
  const [idCounter, setIdCounter] = useState<number>(0)
  const { handleSubmit, errors, control } = useForm<any>()

  const createField = () => {
    setData([...data, {
      username: '',
      id: `${name}-${idCounter}`
    }])
    setIdCounter(idCounter + 1)
  }

  const updateField = ({ id, username }: { id: string, username: string }) => {
    const updatedData: IPlayer[] = data.map((f: IPlayer):IPlayer => {
      if (f.id !== id) return f

      return {
        username,
        id
      }
    })
    setData(updatedData)
  }

  const removeField = ({ id }: { id: string }) => {
    const updatedData: IPlayer[] = data.filter(f => f.id !== id)
    setData(updatedData)
  }

  const onSubmit = () => {
    if (!data.length) {
      return alert("Game can not start without any user")
    }
    nextStep()
  }

  const fields = data.map(field => (
    <PlayerField
      key={field.id}
      data={field}
      updateField={updateField}
      removeField={removeField}
      errors={errors}
      control={control}
    />
  ))

  return (
    <div>
      <h1>Create players</h1>
      <Button
        onClick={createField}
        variant="outlined"
        color="primary"
        size="large"
      >Add player</Button>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields}

        <div>
          <Button className="players_fields_submit" variant="outlined" type="submit">Next</Button>
        </div>
      </form>
    </div>
  )
}

export default PlayersFields