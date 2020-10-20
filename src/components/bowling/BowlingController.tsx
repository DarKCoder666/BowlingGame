import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { EXTENDED_CELL } from '../../consts/CELL_TYPES'
import { FORM_ERRORS } from '../../consts/ERRORS'
import { TextField, Button } from '@material-ui/core'

interface IInputField {
  index: number;
  name: string;
}

const BowlingController: React.FC = ({ nextStep, type }: { nextStep: Function, type: string }) => {
  const [values, setValues] = useState<number[]>([])
  const { handleSubmit, errors, control } = useForm()
  const nameBase: string = 'BowlingController'
  const isExtended: boolean = type === EXTENDED_CELL
  const fields: React.FC<IInputField>[] = []
  let numberOfFields: number = 2

  if (isExtended) {
    const valuesSum: number = values.slice(0, 2).reduce((a, b) => a + b, 0)
    if (valuesSum === 10 || values[0] === 10) numberOfFields = 3
    else numberOfFields = 2
  }

  const onSubmit = () => {
    const result: number[] = values.map(v => parseInt(v))
    const sum: number = values.reduce((a, b) => a + b, 0)

    if (type === EXTENDED_CELL && sum > 30) return alert("Sum of two throws can not be greater then 10!")
    if (type !== EXTENDED_CELL && sum > 10) return alert("Sum of two throws can not be greater then 10!")
    nextStep(result)
  }

  const updateValue = ({ index, value }) => {
    const newValues:number[] = [...values]
    newValues.splice(index, 1, parseInt(value))

    setValues(newValues)
  }



  for (let i = 0; i < numberOfFields; i++) {
    if (i === numberOfFields - 1) {

    }
    fields.push(
      <InputField
        key={i}
        index={i}
        name={`${nameBase}-${i}`}
        control={control}
        errors={errors}
        updateValue={updateValue}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields}

      <div>
        <Button className="bowling_button" type="submit" variant="contained" color="primary">Next</Button>
      </div>
    </form>
  )
}

const InputField: React.FC<IInputField> = ({ index, name, control, errors, updateValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: FORM_ERRORS.REQUIRED,
        min: 0,
        max: 10
      }}
      defaultValue=""
      render={props => (
        <TextField
          {...props}
          className="bowling_input"
          type="number"
          placeholder={`Throw #${index + 1}`}
          error={errors[name] ? true : false}
          helperText={errors[name] ? errors[name].message : ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(e);
            updateValue({ index, value: e.target.value })
          }}
        />
      )}
    />
  )
}

export default BowlingController