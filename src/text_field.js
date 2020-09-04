// https://material-ui.com/api/text-field/

import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import withGuid from './hocs/with_guid.js'
import withHelperText from './hocs/with_helper_text.js'

import { TextField as MaterialTextField, FormLabel } from '@material-ui/core'

import {
  InputVariantStandard,
  InputVariantOutlined,
  InputVariantFilled,
  InputLabelDisplayModeInside,
  InputLabelDisplayModeAbove,
  TextFieldTypeText,
  TextFieldTypeNumber,
  TextFieldTypeEmail,
  TextFieldCapitalizationNone,
  TextFieldCapitalizationUppercase,
  TextFieldCapitalizationCapitalize
} from './constants.js'

const styles = (theme) => ({})

class TextField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    let value

    const propsValue = `${props.value || ''}`
    let defaultValue = `${state.defaultValue || ''}`
    const stateValue = `${state.value || ''}`

    if (defaultValue !== propsValue) {
      defaultValue = propsValue
      value = propsValue
    } else {
      if (props.propsPrior) {
        defaultValue = propsValue
        value = propsValue
      } else {
        value = stateValue
      }
    }

    return {
      value: value,
      defaultValue: defaultValue
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.value !== nextState.value ||
      this.props.displayName !== nextProps.displayName ||
      this.props.hasError !== nextProps.hasError ||
      this.props.readOnly !== nextProps.readOnly
    )
  }

  onChange = (event) => {
    const { onChange, capitalization } = this.props
    let value = (event.target.value || '').trimLeft()
    if (capitalization === TextFieldCapitalizationUppercase) {
      value = value.toUpperCase()
    }
    if (capitalization === TextFieldCapitalizationCapitalize) {
      value = value.charAt(0).toUpperCase() + value.slice(1)
    }

    this.setState({
      value: value
    })

    if (onChange) {
      onChange(value)
    }
  }

  onBlur = () => {
    const { onBlur } = this.props
    if (onBlur) {
      onBlur()
    }
  }

  type() {
    return this.props.type
  }

  inputProps() {
    const { variant, underline } = this.props
    const inputProps = {}
    if (variant === InputVariantFilled) {
      inputProps.disableUnderline = !underline
    }
    return inputProps
  }

  render() {
    const { classes, className, guid, hasError, placeholder } = this.props

    const {
      name,
      displayName,
      variant,
      displayNamePosition,
      readOnly,
      multiline,
      rows,
      disableAutoComplete
    } = this.props

    const { value } = this.state

    return (
      <React.Fragment>
        {displayNamePosition === InputLabelDisplayModeAbove &&
          displayName &&
          displayName !== '' && (
            <FormLabel htmlFor={guid} error={hasError}>
              {`${displayName}:`}
            </FormLabel>
          )}
        <MaterialTextField
          className={clsx(classes.root, className)}
          id={guid}
          inputRef={(ref) => (this.textField = ref)}
          fullWidth
          error={hasError}
          InputProps={this.inputProps()}
          type={this.type()}
          name={disableAutoComplete ? guid : name}
          label={
            displayNamePosition === InputLabelDisplayModeInside
              ? displayName
              : undefined
          }
          variant={variant}
          value={value || ''}
          onChange={this.onChange}
          onBlur={this.onBlur}
          disabled={readOnly}
          multiline={multiline}
          rows={rows}
          placeholder={placeholder || ''}
        />
      </React.Fragment>
    )
  }
}

TextField.propTypes = {
  variant: PropTypes.oneOf([
    InputVariantStandard,
    InputVariantOutlined,
    InputVariantFilled
  ]),
  type: PropTypes.oneOf([
    TextFieldTypeText,
    TextFieldTypeEmail,
    TextFieldTypeNumber
  ]),
  displayNamePosition: PropTypes.oneOf([
    InputLabelDisplayModeAbove,
    InputLabelDisplayModeInside
  ]),
  propsPrior: PropTypes.bool,
  capitalization: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  readOnly: PropTypes.bool
}

TextField.defaultProps = {
  variant: InputVariantOutlined,
  type: TextFieldTypeText,
  displayNamePosition: InputLabelDisplayModeInside,
  underline: true,
  propsPrior: false,
  capitalization: TextFieldCapitalizationNone,
  multiline: false,
  rows: 5,
  readOnly: false
}

export default compose(withGuid, withHelperText, withStyles(styles))(TextField)
export { TextField as RawTextField }
