// https://material-ui.com/api/text-field/
// https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme

import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import withGuid from './hocs/with_guid.js'
import withHelperText from './hocs/with_helper_text.js'

import { TextField as MaterialTextField, FormLabel } from '@material-ui/core'
import MaskedInput from 'react-text-mask'

import {
  InputVariantStandard,
  InputVariantOutlined,
  InputVariantFilled,
  InputLabelDisplayModeInside,
  InputLabelDisplayModeAbove,
  TextFieldTypePhone
} from './constants.js'

const styles = (theme) => ({})

class PhoneMask extends React.Component {
  render() {
    const { inputRef, mask, onChange, value, ...other } = this.props
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null)
        }}
        mask={mask}
        placeholderChar={'\u2000'}
        showMask
        guide={false}
        onChange={onChange}
        value={value}
      />
    )
  }
}

class PhoneField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.onChange = this.onChange.bind(this)
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
      value = stateValue
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

  onChange(event) {
    const { onChange } = this.props
    const value = event.target.value
    this.setState({
      value: value
    })

    if (onChange) {
      onChange(value)
    }
  }

  render() {
    const {
      classes,
      className,
      aboveLabelClassName,
      guid,
      hasError,
      readOnly
    } = this.props

    const {
      name,
      displayName,
      variant,
      underline,
      displayNamePosition,
      mask,
      disableAutoComplete
    } = this.props

    const { value } = this.state

    const inputProps = {
      inputComponent: PhoneMask,
      inputProps: {
        value: value || '',
        mask: mask,
        onChange: this.onChange
      }
    }
    if (variant === InputVariantFilled) {
      inputProps.disableUnderline = !underline
    }

    return (
      <React.Fragment>
        {displayNamePosition === InputLabelDisplayModeAbove && (
          <FormLabel
            htmlFor={guid}
            error={hasError}
            className={aboveLabelClassName}
          >
            {`${displayName}:`}
          </FormLabel>
        )}
        <MaterialTextField
          className={clsx(classes.root, className)}
          id={guid}
          fullWidth
          error={hasError}
          InputProps={inputProps}
          type={TextFieldTypePhone}
          name={disableAutoComplete ? guid : name}
          label={
            displayNamePosition === InputLabelDisplayModeInside
              ? displayName
              : undefined
          }
          variant={variant}
          disabled={readOnly}
        />
      </React.Fragment>
    )
  }
}

PhoneField.propTypes = {
  variant: PropTypes.oneOf([
    InputVariantStandard,
    InputVariantOutlined,
    InputVariantFilled
  ]),
  displayNamePosition: PropTypes.oneOf([
    InputLabelDisplayModeAbove,
    InputLabelDisplayModeInside
  ]),
  readOnly: PropTypes.bool,
  displayName: PropTypes.string,
  mask: PropTypes.array.isRequired,
  value: PropTypes.string
}

PhoneField.defaultProps = {
  variant: InputVariantOutlined,
  displayNamePosition: InputLabelDisplayModeInside,
  underline: true,
  readOnly: false
}
export default compose(withGuid, withHelperText, withStyles(styles))(PhoneField)
