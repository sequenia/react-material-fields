# @sequenia/react-material-fields

> React custom component with Material-UI design

[![NPM](https://img.shields.io/npm/v/react-material-fields.svg)](https://www.npmjs.com/package/react-material-fields) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @sequenia/react-material-fields
```

## Usage

### TextField

```jsx
import React, { Component } from 'react'

import { TextField } from '@sequenia/react-material-fields'

class Example extends Component {
  render() {
    return <TextField displayName = { "Text field" } // title of this field (also for all fields)
                      variant = { "outlined" } // variants of styling: "outlined" by default prop, "filled" and "standard" (also fo Phone, Password, Decimal, Select and DateTime fields)
                      displayNamePosition = { "inside" } // position of title: "inside" by default prop and "above" (also fo Phone, Password, Decimal, Select and DateTime fields)
                      readOnly = { false } // boolean disabling, false by default prop (also fo Phone, Password, Decimal, Select and DateTime fields)
                      hasError = { false } // boolean error highlight, false by default prop (also fo Phone, Password, Decimal, Select and DateTime fields)
                      type = { "text" } // type "text" by default prop, "number" of "email"
                      capitalization = { "none" } // text capitalization for field: "uppercase", "lowercase", "capitalize", "none" by default prop
                      multiline = { false } // boolean, convert field to textarea, false by default prop
                      rows = { 5 } // number of rows if multiline is true, 5 by default
  }
}
```

## License

MIT © [sequenia](https://github.com/sequenia)
