// https://material-ui.com/ru/api/checkbox/

import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import {
  Checkbox as MaterialCheckbox,
  FormControlLabel
} from '@material-ui/core'

import {
  CheckboxLabelPlacementStart,
  CheckboxLabelPlacementEnd
} from './constants.js'

const styles = (theme) => ({
  root: {
    '& .MuiFormControlLabel-label': {
      fontSize: '14px',
      '@media (max-width: 768px)': {
        fontSize: '13px',
        lineHeight: '16px',
        fontWeight: '400'
      }
    }
  }
})

class Checkbox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.onChange = this.onChange.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    let checked

    const propsChecked = props.checked
    let defaultChecked = state.defaultChecked
    const stateChecked = state.checked

    if (defaultChecked !== propsChecked) {
      defaultChecked = propsChecked
      checked = propsChecked
    } else {
      checked = stateChecked
    }

    return {
      checked: checked,
      defaultChecked: defaultChecked
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.checked !== nextState.checked
  }

  onChange(event) {
    const { onChange } = this.props
    const checked = event.target.checked
    this.setState({
      checked: checked
    })

    if (onChange) {
      onChange(checked)
    }
  }

  render() {
    const { classes, className } = this.props

    const { name, displayName, placement } = this.props

    const { checked } = this.state

    return (
      <FormControlLabel
        className={clsx(classes.root, className)}
        control={
          <MaterialCheckbox
            onChange={this.onChange}
            checked={checked}
            name={name}
          />
        }
        label={displayName}
        value={name}
        labelPlacement={placement}
      />
    )
  }

  helperText() {
    return ''
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  placement: PropTypes.oneOf([
    CheckboxLabelPlacementStart,
    CheckboxLabelPlacementEnd
  ]),
  displayName: PropTypes.node
}

Checkbox.defaultProps = {
  checked: false,
  placement: CheckboxLabelPlacementEnd
}

export default withStyles(styles)(Checkbox)
