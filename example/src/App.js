import React from 'react'
import { Checkbox, DecimalField, TextField, PhoneField, PasswordField } from 'react-material-fields'

const App = () => {
  return <React.Fragment>
     <TextField type = { "text" }/>
     <PhoneField mask = { [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] } 
                 type = { "phone" }/>
     <PasswordField />
     <DecimalField />            
     <Checkbox />            
  </React.Fragment>
}

export default App
