// https://material-ui.com/ru/api/select/
// https://material-ui.com/ru/api/menu-item/

import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'

import {
  Select,
  FormLabel,
  InputLabel,
  FormControl,
  MenuItem
} from '@material-ui/core'

import {
  InputVariantStandard,
  InputVariantOutlined,
  InputVariantFilled,
  InputLabelDisplayModeInside,
  InputLabelDisplayModeAbove,
  ClearItemValue
} from './constants.js'

const selectStyles = (theme) => ({
  root: {
    '& .MuiSelect-selectMenu': {
      display: 'flex',
      '& $checkMark': {
        display: 'none'
      }
    }
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    display: 'block'
  },
  checkMark: {
    marginLeft: '24px'
  },
  displayValue: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
})

class SelectField extends React.Component {
  constructor(props) {
    super(props)
    this.labelId = uuidv4()

    this.state = {}
    this.onChange = this.onChange.bind(this)

    this.value = this.value.bind(this)
    this.renderValue = this.renderValue.bind(this)
  }

  onChange(event) {}

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.displayName !== nextProps.displayName ||
      this.props.hasError !== nextProps.hasError ||
      this.state.isOpen !== nextState.isOpen ||
      this.props.readOnly !== nextProps.readOnly
    )
  }

  value() {
    return ''
  }

  renderValue() {
    return <React.Fragment />
  }

  pickerContent() {
    return <React.Fragment />
  }

  clearItem() {
    const { classes, clearItem } = this.props
    return (
      <MenuItem
        key={ClearItemValue}
        value={ClearItemValue}
        className={classes.menuItem}
      >
        <span className={classes.text}>{clearItem}</span>
      </MenuItem>
    )
  }

  render() {
    const {
      classes,
      className,
      guid,
      hasError,
      multiple,
      allowClear,
      readOnly
    } = this.props

    const { name, displayName, variant, displayNamePosition } = this.props

    return (
      <React.Fragment>
        {displayNamePosition === InputLabelDisplayModeAbove && (
          <FormLabel htmlFor={guid} error={hasError}>
            {`${displayName}:`}
          </FormLabel>
        )}
        <FormControl variant={variant} fullWidth disabled={readOnly}>
          {displayNamePosition === InputLabelDisplayModeInside && (
            <React.Fragment>
              {allowClear && (
                <InputLabel id={this.labelId} error={hasError} shrink>
                  {`${displayName}`}
                </InputLabel>
              )}
              {!allowClear && (
                <InputLabel id={this.labelId} error={hasError}>
                  {`${displayName}`}
                </InputLabel>
              )}
            </React.Fragment>
          )}
          <Select
            className={clsx(classes.root, className)}
            fullWidth
            id={guid}
            labelId={this.labelId}
            name={name}
            variant={variant}
            value={this.value()}
            renderValue={() => {
              const renderedValue = this.renderValue()
              return (
                <div className={classes.displayValue} title={renderedValue}>
                  {renderedValue}
                </div>
              )
            }}
            error={hasError}
            multiple={multiple}
            displayEmpty={allowClear}
            MenuProps={{
              onEnter: () => {
                this.setState({ isOpen: true })
              },
              onExit: () => {
                this.setState({ isOpen: false })
              }
            }}
            onOpen={this.onOpen}
            onChange={this.onChange}
          >
            {this.pickerContent()}
          </Select>
        </FormControl>
      </React.Fragment>
    )
  }
}

SelectField.propTypes = {
  variant: PropTypes.oneOf([
    InputVariantStandard,
    InputVariantOutlined,
    InputVariantFilled
  ]),
  displayNamePosition: PropTypes.oneOf([
    InputLabelDisplayModeAbove,
    InputLabelDisplayModeInside
  ]),
  clearItem: PropTypes.string,
  allowClear: PropTypes.bool,
  multiple: PropTypes.bool
}

SelectField.defaultProps = {
  variant: InputVariantOutlined,
  displayNamePosition: InputLabelDisplayModeInside,
  underline: true,
  allowClear: false,
  clearItem: 'all',
  multiple: false
}

export default SelectField
export { selectStyles }
