// https://www.npmjs.com/package/react-number-format

import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import withGuid from './hocs/with_guid.js'
import withHelperText from './hocs/with_helper_text.js'

import { RawTextField } from './text_field.js'
import NumberFormat from 'react-number-format'

import {
  InputVariantStandard,
  InputVariantOutlined,
  InputVariantFilled,
  InputLabelDisplayModeInside,
  InputLabelDisplayModeAbove
} from './constants.js'

const styles = (theme) => ({})

class DecimalMask extends React.Component {
  render() {
    const {
      inputRef,
      mask,
      onChange,
      value,
      prefix,
      suffix,
      scale,
      ...other
    } = this.props
    const { decimalSeparator, thousandSeparator } = this.props
    return (
      <NumberFormat
        {...other}
        getInputRef={(ref) => {
          inputRef(ref || null)
        }}
        decimalSeparator={decimalSeparator}
        thousandSeparator={thousandSeparator}
        thousandsGroupStyle='thousand'
        allowLeadingZeros={false}
        allowNegative
        fixedDecimalScale={false}
        allowEmptyFormatting
        displayType='input'
        decimalScale={scale}
        isNumericString
        prefix={prefix}
        suffix={suffix}
        type='text'
        onValueChange={(result) => {
          const { floatValue } = result
          onChange(floatValue)
        }}
        value={value || ''}
      />
    )
  }
}

class DecimalField extends RawTextField {
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

    const real = value.split('.')[0]
    const frac = value.split('.')[1]

    if (parseInt(frac) === 0) {
      value = real
    }

    return {
      value: value,
      defaultValue: defaultValue
    }
  }

  onChange = (value) => {
    const { onChange } = this.props
    this.setState({
      value: value
    })

    if (onChange) {
      onChange(value)
    }
  }

  onBlur = () => {
    const { value } = this.state
    const { precision, scale } = this.props
    const maxReal = precision - scale

    if (!value || value === '') {
      this.onChange('')
      return
    }

    let real = value.split('.')[0]
    const frac = value.split('.')[1]

    if (!real || real === '') {
      real = '0'
    } else if (real.length > maxReal) {
      real = new Array(maxReal + 1).join('9')
    }

    const newVal = [real]
    if (frac && frac !== '') {
      newVal.push(frac)
    }
    this.onChange(newVal.join('.'))
  }

  inputProps() {
    const { variant, underline, prefix, suffix, precision, scale } = this.props
    const { decimalSeparator, thousandSeparator } = this.props
    const { value } = this.state

    const inputProps = {
      inputComponent: DecimalMask,
      inputProps: {
        value: value || '',
        prefix: prefix,
        suffix: suffix,
        precision: precision,
        scale: scale,
        decimalSeparator: decimalSeparator,
        thousandSeparator: thousandSeparator,
        onChange: this.onChange,
        onBlur: this.onBlur
      }
    }
    if (variant === InputVariantFilled) {
      inputProps.disableUnderline = !underline
    }
    return inputProps
  }

  type() {
    return 'text'
  }
}

DecimalField.propTypes = {
  variant: PropTypes.oneOf([
    InputVariantStandard,
    InputVariantOutlined,
    InputVariantFilled
  ]),
  displayNamePosition: PropTypes.oneOf([
    InputLabelDisplayModeAbove,
    InputLabelDisplayModeInside
  ]),
  propsPrior: PropTypes.bool,
  capitalization: PropTypes.string,
  readOnly: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  precision: PropTypes.number.isRequired,
  scale: PropTypes.number
}

DecimalField.defaultProps = {
  variant: InputVariantOutlined,
  displayNamePosition: InputLabelDisplayModeInside,
  underline: true,
  scale: 2,
  decimalSeparator: ',',
  thousandSeparator: '.',
  propsPrior: false,
  multiline: false,
  rows: 5,
  readOnly: false
}

export default compose(
  withGuid,
  withHelperText,
  withStyles(styles)
)(DecimalField)
