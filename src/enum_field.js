// https://material-ui.com/ru/api/select/
// https://material-ui.com/ru/api/menu-item/

import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import withHelperText from './hocs/with_helper_text.js'
import withGuid from './hocs/with_guid.js'

import { MenuItem } from '@material-ui/core'

import SelectField, { selectStyles } from './select_field.js'
import IcCheckMark from './resources/icons/ic_check_mark.js'

import {
  InputVariantStandard,
  InputVariantOutlined,
  InputVariantFilled,
  InputLabelDisplayModeInside,
  InputLabelDisplayModeAbove,
  ClearItemValue
} from './constants.js'

const styles = (theme) => ({})

class EnumField extends SelectField {
  constructor(props) {
    super(props)

    this.processValue = this.processValue.bind(this)
    this.isSelected = this.isSelected.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    let value

    const { multiple, availableValues } = props

    const emptyValue = multiple ? [] : ''

    const propsValue = props.value || emptyValue
    let defaultValue = state.defaultValue || emptyValue
    const stateValue = state.value || emptyValue

    if (JSON.stringify(defaultValue) !== JSON.stringify(propsValue)) {
      defaultValue = propsValue
      value = propsValue
    } else {
      value = stateValue
    }

    return {
      ...state,
      availableValues: availableValues,
      value: value,
      defaultValue: defaultValue
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      super.shouldComponentUpdate(nextState, nextState) ||
      JSON.stringify(this.state.value) !== JSON.stringify(nextState.value) ||
      JSON.stringify(this.state.availableValues) !==
        JSON.stringify(nextState.availableValues)
    )
  }

  value() {
    const { value } = this.state
    return value
  }

  onChange(event) {
    const { onChange } = this.props
    const value = this.processValue(event.target.value)

    this.setState({
      value: value
    })

    if (onChange) {
      onChange(value)
    }
  }

  processValue(newValue) {
    const { multiple } = this.props
    if (!multiple) {
      return newValue === ClearItemValue ? '' : newValue
    }
    if (newValue.includes(ClearItemValue)) {
      return []
    }
    return newValue
  }

  renderValue() {
    const { multiple, enum: enumModel, clearItem } = this.props
    const { value } = this.state

    if (!multiple && (!value || value === '')) {
      return clearItem
    }
    if (multiple && value.length === 0) {
      return clearItem
    }
    if (!multiple) {
      return enumModel.label(value)
    }

    return value
      .map((val) => {
        return enumModel.label(val)
      })
      .join(', ')
  }

  isSelected(val) {
    const { multiple } = this.props
    const { value } = this.state
    if (!multiple) {
      return val === value
    }
    return value.includes(val)
  }

  pickerContent() {
    const { classes, allowClear } = this.props

    const { enum: enumModel } = this.props

    const { availableValues } = this.state

    let optionValues = enumModel.rawValues()
    if (availableValues) {
      optionValues = optionValues.filter(
        (val) => availableValues.includes(val) || this.isSelected(val)
      )
    }

    const options = optionValues.map((rawValue) => {
      return (
        <MenuItem key={rawValue} value={rawValue} className={classes.menuItem}>
          <span className={classes.text}>{enumModel.label(rawValue)}</span>
          {this.isSelected(rawValue) && (
            <IcCheckMark className={classes.checkMark} />
          )}
        </MenuItem>
      )
    })
    if (allowClear && optionValues.length > 0) {
      options.unshift(this.clearItem())
    }
    return options
  }

  render() {
    const { enum: enumModel } = this.props

    if (!enumModel) {
      return <React.Fragment />
    }
    return super.render()
  }
}

EnumField.propTypes = {
  variant: PropTypes.oneOf([
    InputVariantStandard,
    InputVariantOutlined,
    InputVariantFilled
  ]),
  displayNamePosition: PropTypes.oneOf([
    InputLabelDisplayModeAbove,
    InputLabelDisplayModeInside
  ]),
  allowClear: PropTypes.bool,
  multiple: PropTypes.bool
}

EnumField.defaultProps = {
  variant: InputVariantOutlined,
  displayNamePosition: InputLabelDisplayModeInside,
  underline: true,
  allowClear: false,
  clearItem: 'all',
  multiple: false
}

export default compose(
  withGuid,
  withHelperText,
  withStyles(
    (theme) => ({
      ...selectStyles(theme),
      ...styles(theme)
    }),
    { withTheme: true }
  )
)(EnumField)
