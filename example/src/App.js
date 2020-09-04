import React from 'react'
import { DateTimeField, DecimalField, FileField, ImageField, SelectField, TextField, PhoneField, PasswordField } from 'react-material-fields'

const App = () => {
  const data = [
    {
      key: "One",
      value: "1"
    },
    {
      key: "Two",
      value: "2"
    },
    {
      key: "Three",
      value: "3"
    },
    {
      key: "Four",
      value: "4"
    },
    {
      key: "Five",
      value: "5"
    },
    {
      key: "Six",
      value: "6"
    },
    {
      key: "Seven",
      value: "7"
    }
  ]

  return <React.Fragment>
     <TextField type = { "text" }/>
     <PhoneField mask = { [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] } 
                 type = { "phone" }/>
     <PasswordField />
     <DecimalField precision = { 3 } />
     <SelectField data = { data } multiple = { true } allowClear = { true }/>
     <DateTimeField />
     <FileField uploader = {() => Promise.resolve() } allowSelfLoad = { true } />
  </React.Fragment>
}

export default App
