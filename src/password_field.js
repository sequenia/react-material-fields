// https://material-ui.com/api/text-field/

import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { compose } from 'recompose'
import withGuid from './hocs/with_guid.js'
import withHelperText from './hocs/with_helper_text.js'

import {
  TextField as MaterialTextField,
  FormLabel,
  IconButton
} from '@material-ui/core'

import IcOpenedEye from './resources/icons/ic_opened_eye.js'
import IcClosedEye from './resources/icons/ic_closed_eye.js'

import {
  InputVariantStandard,
  InputVariantOutlined,
  InputVariantFilled,
  InputLabelDisplayModeInside,
  InputLabelDisplayModeAbove
} from './constants.js'

const styles = (theme) => ({
  container: {
    position: 'relative'
  },
  root: {},
  withEye: {
    '& .MuiInputBase-input': {
      paddingRight: '54px'
    }
  },
  label: {
    display: 'block'
  },
  eye: {
    position: 'absolute',
    top: '13%',
    right: '12px'
  }
})

class PasswordField extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onEyeClicked = this.onEyeClicked.bind(this)

    this.state = {
      passwordShowing: false
    }
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
      defaultValue: defaultValue,
      disableShowPassword: props.disableShowPassword
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.value !== nextState.value ||
      this.props.displayName !== nextProps.displayName ||
      this.state.passwordShowing !== nextState.passwordShowing ||
      this.props.hasError !== nextProps.hasError ||
      this.props.readOnly !== nextProps.readOnly ||
      this.state.disableShowPassword !== nextState.disableShowPassword
    )
  }

  onEyeClicked() {
    const { passwordShowing } = this.state
    this.setState({
      passwordShowing: !passwordShowing
    })
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
      iconClassName,
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
      disableAutoComplete
    } = this.props

    const { value, passwordShowing, disableShowPassword } = this.state

    const inputProps = {}
    if (variant === InputVariantFilled) {
      inputProps.disableUnderline = !underline
    }

    return (
      <React.Fragment>
        {displayNamePosition === InputLabelDisplayModeAbove && (
          <FormLabel htmlFor={guid} error={hasError}>
            {`${displayName}:`}
          </FormLabel>
        )}
        <div className={classes.container}>
          <MaterialTextField
            className={clsx({
              [classes.root]: true,
              [className]: true,
              [classes.withEye]: !disableShowPassword
            })}
            id={guid}
            fullWidth
            error={hasError}
            InputProps={inputProps}
            type={passwordShowing ? 'text' : 'password'}
            name={disableAutoComplete ? guid : name}
            label={
              displayNamePosition === InputLabelDisplayModeInside
                ? displayName
                : undefined
            }
            variant={variant}
            value={value || ''}
            onChange={this.onChange}
            disabled={readOnly}
          />
          <IconButton
            className={clsx(classes.eye, iconClassName)}
            onClick={this.onEyeClicked}
          >
            {!disableShowPassword && passwordShowing && <IcOpenedEye />}
            {!disableShowPassword && !passwordShowing && <IcClosedEye />}
          </IconButton>
        </div>
      </React.Fragment>
    )
  }
}

PasswordField.propTypes = {
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
  disableShowPassword: PropTypes.bool
}

PasswordField.defaultProps = {
  variant: InputVariantOutlined,
  displayNamePosition: InputLabelDisplayModeInside,
  underline: true,
  readOnly: false,
  disableShowPassword: false
}

export default compose(
  withGuid,
  withHelperText,
  withStyles(styles)
)(PasswordField)
