import React from 'react'
import './index.css'
import { Grid } from '@material-ui/core';
import {
  Checkbox,
  DateTimeField,
  ImageField, FileField,
  SelectField, RemoteSelectField,
  TextField, DecimalField, PhoneField, PasswordField, WYSIWYGField 
} from 'react-material-fields'

const App = () => {
  const selectData = [
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
  ];
  const singleSelectValue = {
    "id":2,
    "email":"janet.weaver@reqres.in",
    "first_name":"Janet",
    "last_name":"Weaver",
    "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
  };
  const multipleSelectValue = [
    {
      "id":2,
      "email":"janet.weaver@reqres.in",
      "first_name":"Janet",
      "last_name":"Weaver",
      "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
    },
    {
      "id":3,
      "email":"emma.wong@reqres.in",
      "first_name":"Emma",
      "last_name":"Wong",
      "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
    }
  ];

  return <div className = "container">
    <h1>React Material Fields</h1>
    <p>React custom component with Material-UI design.</p>
    <section className = "section">
      <h3>TextField component</h3>
      <p>It's a simple text, email, or number input field.</p>
      <p>Variants of styling (also fo Phone, Password, Decimal, Select and DateTime fields): </p>  
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "standard" } 
                    variant = { "standard" }/>
        </Grid>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "filled" } 
                    variant = { "filled" }/>
        </Grid>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "outlined" } 
                    variant = { "outlined" }/>
        </Grid>
      </Grid>
      <p>Name displaying (also fo Phone, Password, Decimal, Select and DateTime fields): </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "above" }
                    displayNamePosition = { "above" } />
        </Grid>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "inside" }
                    displayNamePosition = { "inside" } />
        </Grid>
      </Grid>  
      <p>Read only disabling (also fo Phone, Password, Decimal, Select and DateTime fields): </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "Read only" }
                    readOnly = { true } />
        </Grid>
      </Grid>  
      <p>Error (also fo Phone, Password, Decimal, Select and DateTime fields): </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "Error" }
                    hasError = { true } />
        </Grid>
      </Grid>  
      <p>Capitalization: </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "capitalize" }
                    capitalization = { "capitalize" } />
        </Grid>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "lowercase" }
                    capitalization = { "lowercase" } />
        </Grid>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "uppercase" }
                    capitalization = { "uppercase" } />
        </Grid>
      </Grid>    
      <p>Types: </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <TextField type = { "email" }
                    displayName = { "email" } />
        </Grid>
        <Grid item md = {4}>
          <TextField type = { "number" }
                    displayName = { "number" }
                    capitalization = { "lowercase" } />
        </Grid>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "text" } 
                    underline = { false } />
        </Grid>
      </Grid>    
      <p>Multiline rows (also for Decimal field): </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <TextField type = { "text" }
                    displayName = { "Multiple rows" } 
                    multiline = { true }
                    rows = { 4 }/>
        </Grid>
      </Grid>    
    </section>
    <section className = "section">
      <h3>PhoneField component</h3>
      <p>Input field with phone number mask.</p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <PhoneField displayName = { "Phone field" } 
                      mask = { ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] }
                      value = { '(123) 456-78-90' }/>
        </Grid>
      </Grid>    
    </section>
    <section className = "section">
      <h3>PasswordField component</h3>
      <p>Password field with toggle password visibility.</p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <PasswordField displayName = { "Password field" }
                         autocomplete = { "off" } 
                         disableAutoComplete = { true }
                         value = { "dontwatchthis!" } />
        </Grid>
      </Grid>    
    </section>    
    <section className = "section">
      <h3>DecimalField component</h3>
      <p>
        Number field with special formatting. It has two number options: precision (length of number) and scale (length after point).<br/> 
        Also you can set decimal separator, thousand separator and prefix/suffix string.
      </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <DecimalField displayName = { "Prefix" }
                        displayNamePosition = { "above" } 
                        prefix = { "£" }
                        precision = { 12 }
                        scale = { 2 } />
        </Grid>
        <Grid item md = {4}>
          <DecimalField displayName = { "Suffix" }
                        displayNamePosition = { "above" } 
                        suffix = { "$" }
                        precision = { 12 }
                        scale = { 2 } />
        </Grid>
      </Grid>
    </section>
    <section className = "section">
      <h3>DateTimeField component</h3>
      <p>
        Simple datepicker field.<br/>
        You can set format, locale, utcOffset, minDate, maxDate, serverDateFormat, serverDateTimeFormat.
      </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <DateTimeField />
        </Grid>      
      </Grid>        
    </section>    
    <section className = "section">
      <h3>Checkbox component</h3>
      <p>
        Just checkbox :)
      </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <Checkbox displayName = "Placement end and checked"
                    checked = { true }
                    placement = { "end" }/>
        </Grid>    
        <Grid item md = {4}>
          <Checkbox displayName = "Placement start"
                    placement = { "start" }/>
        </Grid>   
      </Grid>        
    </section>   
    <section className = "section">
      <h3>SelectField component</h3>
      <p>
        Custom select.
      </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <SelectField data = { selectData }
                       displayName = { "Multiple choosing" } 
                       multiple = { true } 
                       allowClear = { false }/>
        </Grid>    
        <Grid item md = {4}>
        <SelectField data = { selectData }
                     displayName = { "All option" } 
                     allowClear = { true } />
        </Grid>   
      </Grid>        
    </section>    
    <section className = "section">
      <h3>RemoteSelectField component</h3>
      <p>
        Custom select with remote data and searching field.
      </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <RemoteSelectField multiple = { true }
                             displayName = { "Multiple select" } 
                             optionDisplayName = { (option) => {
                              const { first_name, last_name } = option;
                              return `${first_name} ${last_name}`;
                             }}
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
        </Grid>    
        <Grid item md = {4}>
          <RemoteSelectField allowClear = { true }
                             displayName = { "Single select" } 
                             optionDisplayName = { (option) => {
                              const { first_name, last_name } = option;
                              return `${first_name} ${last_name}`;
                             }}
                             value = { singleSelectValue }
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
        </Grid>      
      </Grid>        
    </section>
    <section className = "section">
      <h3>ImageField component</h3>
      <p>
        Image File uploader.
      </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <ImageField uploader = {() => Promise.resolve() } />
        </Grid>
      </Grid>  
    </section>      
    <section className = "section">
      <h3>FileField component</h3>
      <p>
        File uploader.
      </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <FileField uploader = {() => Promise.resolve() } />
        </Grid>
      </Grid>  
    </section>      
    <section className = "section">
      <h3>WYSIWYGField component</h3>
      <p>
       WYSIWYGField editor.
      </p>
      <Grid container 
            spacing = {3}
            alignItems = { "flex-end" }>
        <Grid item md = {4}>
          <WYSIWYGField />
        </Grid>
      </Grid>  
    </section>      
  </div>
}

export default App
