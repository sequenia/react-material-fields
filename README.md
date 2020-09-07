# @sequenia/react-material-fields

> React custom component with Material-UI design

[![NPM](https://img.shields.io/npm/v/react-material-fields.svg)](https://www.npmjs.com/package/react-material-fields) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @sequenia/react-material-fields
```

## Usage

### TextField component

It's a simple text, email, or number input field.

```jsx
import React, { Component } from 'react'
import { TextField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <TextField className = { "class-name" } // your custom css (or jss) className (also for all fields) 
                      displayName = { "Text field" } // title of this field (also for all fields)
                      variant = { "outlined" } // variants of styling: "outlined" by default prop, "filled" and "standard" (also fo Phone, Password, Decimal, Select and DateTime fields)
                      displayNamePosition = { "inside" } // position of title: "inside" by default prop and "above" (also fo Phone, Password, Decimal, Select and DateTime fields)
                      readOnly = { false } // boolean disabling, false by default prop (also fo Phone, Password, Decimal, Select and DateTime fields)
                      hasError = { false } // boolean error highlight, false by default prop (also fo Phone, Password, Decimal, Select and DateTime fields)
                      type = { "text" } // type "text" by default prop, "number" of "email"
                      capitalization = { "none" } // text capitalization for field: "uppercase", "lowercase", "capitalize", "none" by default prop
                      multiline = { false } // boolean, convert field to textarea, false by default prop
                      rows = { 5 } // number of rows if multiline is true, 5 by default
           />          
  }
}
```

### PhoneField component

Password field with toggle password visibility

```jsx
import React, { Component } from 'react'
import { PhoneField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <PhoneField displayName = { "Phone field" }
                       mask = { ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] } // number mask (is required props)      
           />             
  }
}
```

### PasswordField component

Password field with toggle password visibility.

```jsx
import React, { Component } from 'react'
import { PasswordField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <PasswordField displayName = { "Password field" }
                          disableShowPassword = { false } // boolean, disable  visibility toggling, false by default
                          disableAutoComplete = { false } // disbaling autocomplete, false by default 
           />               
  }
}
```

### DecimalField component

Number field with special formatting. It has two number options: precision (length of number) and scale (length after point).
Also you can set decimal separator, thousand separator and prefix/suffix string.

```jsx
import React, { Component } from 'react'
import { DecimalField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <DecimalField displayName = { "Decimal field" }
                         prefix = { "£" } // string prefix
                         suffix = { "$" } // string suffix
                         precision = { 12 } // length of number (is required props) 
                         scale = { 2 } // length after point, "2" by default
                         decimalSeparator = { "," } // "," by default
                         thousandSeparator = { "." } // "." by default
  }        />
}
```

### DateTimeField component

Simple datepicker field.
You can set format, locale, utcOffset, minDate, maxDate, serverDateFormat, serverDateTimeFormat.

```jsx
import React, { Component } from 'react'
import { DateTimeField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <DateTimeField displayName = { "Datetime field" }
                          format = { "DD.MM.YYYY" } // date-month-year format, DD.MM.YYYY by default
                          locale = { "en" } // language, "en" by default
                          utcOffset = { "3" } // UTC Universal Time offset, "0" by default
                          minDate = { "1970-01-01" } // min date (year-month-day), "1900-01-01" by default
                          maxDate = { "2100-12-31" } // max date (year-month-day), "2100-12-31" by default
                          serverDateFormat = { "YYYY-MM-DD'" } // date format from backend, "YYYY-MM-DD" by default
                          serverDateTimeFormat = { "YYYY-MM-DDTHH:mm:ss" } // date and time format from backend, "YYYY-MM-DDTHH:mm:ss" by default
           />               
  }
}
```

### Checkbox component

Simple checkbox.

```jsx
import React, { Component } from 'react'
import { Checkbox } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <Checkbox displayName = { "Checkbox" }
                     placement = { "end" } // placement of title, "start" or "end", "end" by default
                     checked = { false } // boolean prop
           /> 
  }
}
```

### SelectField and RemoteSelectField components

Custom select element.
RemoteSelectField is a custom select with remote data and searching field.

```jsx
import React, { Component } from 'react'
import { SelectField, RemoteSelectField } from '@sequenia/react-material-fields'

class Example extends Component {

  /* data examples */
  const selectData = [
    {
      key: "One",
      value: "1"
    },
    {
      key: "Two",
      value: "2"
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

  render() {
    return <React.Fragment>
      <SelectField data = { selectData }
                   displayName = { "Select field" } 
                   multiple = { true } // boolean, multiple choosing, false by default
                   allowClear = { false } // boolean, showing "all" option
                   clearItem = { "all" } // text of "all" option
      />
      <RemoteSelectField optionDisplayName = { (option) => {
                           const { first_name, last_name } = option;
                           return `${first_name} ${last_name}`;
                         }}
                         value = { singleSelectValue }
                        //  value = { multipleSelectValue } for multiple choosing
                        //  multiple = { true } // boolean, for multiple choosing,
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
    </React.Fragment>  
  }
}
```


## License

MIT © [sequenia](https://github.com/sequenia)
