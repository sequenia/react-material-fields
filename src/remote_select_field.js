// https://material-ui.com/ru/api/select/
// https://material-ui.com/ru/api/menu-item/

import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import withHelperText from './hocs/with_helper_text.js'
import withGuid from './hocs/with_guid.js'

import { MenuItem, TextField } from '@material-ui/core'
import BaseSelectField, { selectStyles } from './base_select_field.js'

import IcCheckMark from './resources/icons/ic_check_mark.js'

import {
  InputVariantStandard,
  InputVariantOutlined,
  InputVariantFilled,
  InputLabelDisplayModeInside,
  InputLabelDisplayModeAbove,
  ClearItemValue
} from './constants.js'

const styles = (theme) => ({
  textFieldContainer: {
    padding: '0px 16px',
    marginBottom: '10px'
  }
})

class RemoteSelectField extends BaseSelectField {
  constructor(props) {
    super(props)
    this.searchKey = 'RemoteSelectField-TextField'

    this.state = {
      options: undefined,
      query: ''
    }

    this.searchQuery = ''
    this.selectedValueIds = []
  }

  componentDidMount() {
    const { multiple, primaryKey } = this.props
    const { valueId } = this.props
    const { value, options } = this.state

    this.selectedValueIds = []

    if (valueId) {
      if (multiple && valueId.length > 0) {
        this.selectedValueIds = [...valueId]
      }
      if (!multiple) {
        this.selectedValueIds = [valueId]
      }
    } else if (value) {
      if (multiple && value.length > 0) {
        this.selectedValueIds = value.map((val) => `${val[primaryKey]}`)
      }
      if (!multiple) {
        this.selectedValueIds = `${value[primaryKey]}`
      }
    }
    if (options.length === 0 && this.selectedValueIds.length > 0) {
      this.loadData()
    }
  }

  static getDerivedStateFromProps(props, state) {
    let value

    const { multiple } = props

    const emptyValue = multiple ? [] : undefined

    const propsValue = props.value || emptyValue
    let defaultValue = state.defaultValue || emptyValue
    const stateValue = state.value || emptyValue

    if (JSON.stringify(defaultValue) !== JSON.stringify(propsValue)) {
      defaultValue = propsValue
      value = propsValue
    } else {
      value = stateValue
    }
    let options = state.options
    if (!options) {
      if (multiple && value.length > 0) {
        options = [...value]
      } else if (!multiple && value) {
        options = [{ ...value }]
      } else {
        options = []
      }
    }

    return {
      ...state,
      value: value,
      options: options,
      defaultValue: defaultValue
    }
  }

  shouldComponentUpdate(_, nextState) {
    return (
      super.shouldComponentUpdate(nextState, nextState) ||
      JSON.stringify(this.state.value) !== JSON.stringify(nextState.value) ||
      JSON.stringify(this.state.options) !==
        JSON.stringify(nextState.options) ||
      this.state.query !== nextState.query
    )
  }

  onOpen = () => {
    this.loadData()
  }

  onQueryChange = (event) => {
    const value = event.target.value
    this.searchQuery = value
    this.setState({
      query: value
    })

    if (this.timeoutToken) {
      clearTimeout(this.timeoutToken)
    }
    this.timeoutToken = setTimeout(() => {
      clearTimeout(this.timeoutToken)
      this.timeoutToken = undefined

      this.loadData()
    }, this.props.sendQueryTimeout)
  }

  onChange = (event) => {
    const { onChange } = this.props
    const { options } = this.state
    const valueId = event.target.value

    const value = this.processValue(valueId)

    this.setState({
      value: value,
      options: this.updateOptions(options, value)
    })

    if (onChange) {
      onChange(value)
    }
  }

  processValue = (newValue) => {
    const { multiple, primaryKey } = this.props
    const { options } = this.state

    if (!multiple && newValue === ClearItemValue) {
      return ''
    }
    if (multiple && newValue.includes(ClearItemValue)) {
      return []
    }

    if (Array.isArray(newValue)) {
      newValue = newValue.map((val) => `${val}`)
    } else {
      newValue = `${newValue}`
    }

    const values = options.filter((item) => {
      const itemId = `${item[primaryKey]}`
      if (!multiple) {
        return itemId === newValue
      }
      return newValue.includes(itemId)
    })

    this.selectedValueIds = values.map((val) => `${val[primaryKey]}`)

    return multiple ? values : values[0]
  }

  renderValue = () => {
    const { multiple, clearItem } = this.props
    const { value } = this.state

    if (!multiple && !value) {
      return clearItem
    }
    if (multiple && value.length === 0) {
      return clearItem
    }
    if (!multiple) {
      return this.optionDisplayName(value)
    }

    return value
      .map((val) => {
        return this.optionDisplayName(val)
      })
      .join(', ')
  }

  isSelected = (val) => {
    const { multiple, primaryKey } = this.props
    const valId = `${val[primaryKey]}`
    if (!multiple) {
      const { value = {} } = this.state
      const valueId = `${value[primaryKey]}`
      return valId === valueId
    }

    const { value } = this.state
    const valueIds = value.map((val) => `${val[primaryKey]}`)
    return valueIds.includes(valId)
  }

  loadData = () => {
    const { downloader } = this.props
    this.setState({
      loading: true
    })

    downloader(this.searchQuery, this.selectedValueIds)
      .then((list) => {
        this.setState({
          loading: false
        })

        const { value } = this.state
        this.setState({
          loading: false,
          options: this.updateOptions(list, value)
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }

  optionDisplayName = (option) => {
    if (!option) {
      return ''
    }
    return this.props.optionDisplayName(option)
  }

  updateOptions = (options, value) => {
    const { primaryKey, multiple } = this.props
    const newOptions = [...options]

    let valuesArray = []
    if (multiple && value.length > 0) {
      valuesArray = [...value]
    } else if (!multiple && value) {
      valuesArray = [{ ...value }]
    }

    valuesArray.forEach((val) => {
      const index = newOptions.findIndex(
        (item) => `${item[primaryKey]}` === `${val[primaryKey]}`
      )
      if (index >= 0) {
        newOptions.splice(index, 1)
      }
      newOptions.unshift({ ...val })
    })
    return newOptions
  }

  value = () => {
    const { primaryKey, multiple } = this.props
    const { value } = this.state

    if (!value) {
      return ''
    }
    if (!multiple) return `${value[primaryKey]}`
    return value.map((val) => `${val[primaryKey]}`)
  }

  pickerContent = () => {
    const { classes, primaryKey, optionKey, allowClear } = this.props

    const { options, query } = this.state

    const items = options.map((option) => {
      const val = option[primaryKey]
      const key = option[optionKey]
      return (
        <MenuItem
          key={key}
          value={`${val}`}
          aria-disabled
          className={classes.menuItem}
        >
          <span className={classes.text}>{this.optionDisplayName(option)}</span>
          {this.isSelected(option) && (
            <IcCheckMark className={classes.checkMark} />
          )}
        </MenuItem>
      )
    })
    if (allowClear) {
      items.unshift(this.clearItem())
    }
    items.unshift(
      <div className={classes.textFieldContainer} key={this.searchKey}>
        <TextField
          variant={InputVariantOutlined}
          fullWidth
          value={query}
          onChange={this.onQueryChange}
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
          }}
        />
      </div>
    )
    return items
  }
}

RemoteSelectField.propTypes = {
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
  multiple: PropTypes.bool,
  underline: PropTypes.bool,
  downloader: PropTypes.func,
  sendQueryTimeout: PropTypes.number,
  primaryKey: PropTypes.string,
  optionKey: PropTypes.string,
  optionDisplayName: PropTypes.func
}

RemoteSelectField.defaultProps = {
  variant: InputVariantOutlined,
  displayNamePosition: InputLabelDisplayModeInside,
  underline: true,
  sendQueryTimeout: 500,
  primaryKey: 'id',
  optionKey: 'id',
  optionDisplayName: (option) => {
    return option.name
  },
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
)(RemoteSelectField)
