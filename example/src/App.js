import React from 'react'
import {
  DateTimeField,
  ImageField, FileField,
  SelectField, RemoteSelectField,
  TextField, DecimalField, PhoneField, PasswordField } from 'react-material-fields'

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

  const singleSelectValue = {"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"};
  const multipleSelectValue = [
    {"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"},
    {"id":3,"email":"emma.wong@reqres.in","first_name":"Emma","last_name":"Wong","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"}
  ];

  return <React.Fragment>
     <TextField type = { "text" }/>
     <PhoneField mask = { [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] }
                 type = { "phone" }/>
     <PasswordField />
     <DecimalField precision = { 3 } />
     <SelectField data = { data } multiple = { true } allowClear = { true }/>
     <RemoteSelectField multiple = { true }
                        allowClear = { true }
                        optionDisplayName = { (option) => {
                          const { first_name, last_name } = option;
                          return `${first_name} ${last_name}`;
                        }}
                        // value = { singleSelectValue }
                        value = { multipleSelectValue }
                        onChange = { (value) => {
                          console.log(value)
                        }}
                        downloader = { (searchQuery, selectedValueIds) => {
                          const params = {
                            query: searchQuery,
                            valueIds: selectedValueIds
                          }
                          const url = new URL("https://reqres.in/api/users");
                          Object.keys(params).forEach(key => url.searchParams.append(key, encodeURIComponent(params[key])));

                          return fetch(url).then((response) => response.json())
                                           .then((response) => {
                                             const { data } = response;
                                             return data;
                          });
     } }/>
     <DateTimeField  />
     <FileField uploader = {() => Promise.resolve() } allowSelfLoad = { true } />
  </React.Fragment>
}

export default App
