import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { IPlayer } from '../../types/player.type'
import { FORM_ERRORS } from '../../consts/ERRORS'
import './PlayerFields.scss'

const PlayerField = ({ updateField, removeField, data, errors, control }: { updateField: Function, removeField: Function, data: IPlayer, errors: Object, control: any }) => {
  return (
    <div className="player_field">
      <Controller
        name={data.id}
        control={control}
        rules={{
          required: FORM_ERRORS.REQUIRED
        }}
        defaultValue={data.username}
        render={props => (
          <TextField
            {...props}
            error={errors[data.id] ? true : false}
            helperText={errors[data.id] ? errors[data.id].message : ''}
            onChange={(e) => {
              props.onChange(e);
              updateField({ id:data.id, username: e.target.value })
            }}
          />
        )}
      />
      <Button
        className="player_field_close"
        onClick={() => removeField({ id: data.id })}
        color="secondary"
        endIcon={<CloseIcon />}
      >Remove</Button>

    </div>
  )
}

export default PlayerField