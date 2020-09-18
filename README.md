# @sequenia/react-material-fields

> React custom component with Material-UI design

[![NPM](https://img.shields.io/npm/v/react-material-fields.svg)](https://www.npmjs.com/package/react-material-fields) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo
https://sequenia.github.io/react-material-fields/

## Requirements

React v16.0.0 and above, @material-ui/core v4.9.0 and above

## Install

```bash
npm install --save @sequenia/react-material-fields
```

## Usage

List of common properties for all fields:

| name                | type               | default       | description                                                |  
| ------------------- | ------------------ | ------------- | ---------------------------------------------------------- | 
| className           | string             |               | your custom css (or jss) className                         |
| disableAutoComplete | boolean            | false         | disbaling/enabling standart autocomplete                   |
| displayName         | string             |               | title of this field                                        |
| displayNamePosition | string             | "inside"      | position of title: "inside" by default prop and "above"    |
| hasError            | boolean            | false         | error highlight                                            |
| onChange            | function           |               | onChange event callback function                           | 
| readOnly            | boolean            | false         | field disabling                                            |
| variant             | string             | "outlined"    | variants of styling: "outlined", "filled" and "standard"   |
| value               |                    |               | field's value (string, number, array or object)            |



### TextField

It's a simple text, email, or number input field.

| name                | type           | default       | description                                                                                   |
| --------------------|----------------|---------------|-----------------------------------------------------------------------------------------------|
| type                | string         | "text"        | type of input: "text", "number" or "email"                                                    |
| capitalization      | string         | "none"        | text capitalization for field: "uppercase", "lowercase", "capitalize", "none" by default prop |          
| multiline           | boolean        | false         | convert field to textarea                                                                     |
| rows                | number         | 5             | number of rows if multiline is true                                                           |

```jsx
import React, { Component } from 'react'
import { TextField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <TextField displayName = { "Text field" }
                      disableAutoComplete = { true }
                      type = { "email" } />          
  }
}
```

### PhoneField

Text field with number mask

| name                | type           | is required   | description         |
| --------------------|----------------|---------------|---------------------|
| mask                | array          | yes           | number mask array   |

```jsx
import React, { Component } from 'react'
import { PhoneField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <PhoneField displayName = { "Phone field" }
                       mask = { ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] } />             
  }
}
```

### PasswordField

Password field with toggle password visibility.

| name                | type           | default       | description                    |
| --------------------|----------------|---------------|--------------------------------|
| disableShowPassword | boolean        | false         | disables visibility toggling   |

```jsx
import React, { Component } from 'react'
import { PasswordField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <PasswordField displayName = { "Password field" }/>               
  }
}
```

### DecimalField

Number field with special formatting. It has two number options: precision (length of number) and scale (length after point).
Also you can set decimal separator, thousand separator and prefix/suffix string.

| name                | type           | default       | description                    |
| --------------------|----------------|---------------|--------------------------------|
| prefix              | string         |               | string prefix                  |
| suffix              | string         |               | string suffix                  |
| precision           | number         | 10            | length of number before point  |
| scale               | number         | 2             | length after point             |
| decimalSeparator    | string         | ","           | separator symbol               |
| thousandSeparator   | string         | "."           | separator symbol               |

```jsx
import React, { Component } from 'react'
import { DecimalField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <DecimalField displayName = { "Decimal field" }
                         suffix = { "$" } />
  }        
}
```

### DateTimeField

Simple datepicker field.
You can set format, locale, utcOffset, minDate, maxDate, serverDateFormat, serverDateTimeFormat.

| name                | type           | default                | description                             |
| --------------------|----------------|------------------------|--------------------------------         |
| format              | string         | "DD.MM.YYYY"           | date-month-year format                  |
| locale              | string         | "en"                   | language                                |
| utcOffset           | number         | 0                      | UTC Universal Time offset, 0 by default |
| minDate             | text           | "1900-01-01"           | min date (year-month-day)               |
| maxDate             | text           | "2100-12-31"           | max date (year-month-day)               |
| maxDate             | text           | "2100-12-31"           | max date (year-month-day)               |
| serverDateFormat    | text           | "YYYY-MM-DD"           | date format from backend                |
| serverDateTimeFormat| text           | "YYYY-MM-DDTHH:mm:ss"  | date and time format from backend       |


```jsx
import React, { Component } from 'react'
import { DateTimeField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <DateTimeField displayName = { "Datetime field" }/>               
  }
}
```

### Checkbox

Simple checkbox.
NOTE: checkbox element recieve only these props: displayName, checked, placement

| name                | type           | default                | description                          |
| --------------------|----------------|------------------------|--------------------------------------|
| placement           | string         | "end"                  | placement of title, "start" or "end" |
| checked             | boolean        | false                  | checked status                       |

```jsx
import React, { Component } from 'react'
import { Checkbox } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <Checkbox displayName = { "Checkbox" } /> 
  }
}
```

### SelectField and RemoteSelectField

Custom select element.
RemoteSelectField is a custom select with remote data and searching field.

| name                | type           | default                | is required      | description                                                                                                                               |
| --------------------|----------------|------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| data                | array          |                        | yes              | Array of objects. Every object should have "key" and "value". "Key" is a visible string of dropdown option. "Value" is a value of option. | 
| multiple            | boolean        | false                  |                  | multiple choosing    |
| allowClear          | boolean        | false                  |                  | showing "all" option |
| clearItem           | string         | "all"                  |                  | text of "all" option |

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
                   multiple = { true }
                   allowClear = { true }
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
                           }}
      />
    </React.Fragment>  
  }
}
```

### FileField and ImageField

File and image uploader

| name                | type           | default                | is required      | description                                                                                                                               |
| --------------------|----------------|------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| uploader            | function       |                        | yes              | uploader is a function, that should return promise                                                                                        | 
| accept              | text           | "\*/\*"                |                  | file types  |
| deleteText          | string         | "Delete"               |                  | button text |
| notUploadedText     | string         | "Not uploaded"         |                  | button text |
| uploadingText       | string         | "Uploading"            |                  | button text |

```jsx
import React, { Component } from 'react'
import { FileField, ImageField } from '@sequenia/react-material-fields'

render() {
    return <React.Fragment>
      <FileField uploader = {() => Promise.resolve() } /> 
      <ImageField uploader = {() => Promise.resolve() } />
    </React.Fragment>
```


## License

MIT © [sequenia](https://github.com/sequenia)
