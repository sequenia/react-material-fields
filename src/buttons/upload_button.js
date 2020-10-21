import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import withGuid from '../hocs/with_guid.js'
import { withStyles } from '@material-ui/styles'
import { ButtonVariantOutlined } from './constants.js'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from './button.js'
import { compose } from 'recompose'

const styles = (theme) => ({
  input: {
    display: 'none'
  },
  button: {
    padding: '7px 10px'
  },
  error: {
    backgroundColor: 'rgba(255,0,0,0.1)'
  }
})

class UploadButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onChange = (event) => {
    const { onChange, multiple } = this.props
    let value
    if (multiple) {
      value = [...event.target.files]
    } else {
      value = event.target.files[0]
    }
    if (onChange && value) {
      onChange(value)
    }
    this.filePicker.value = ''
  }

  static getDerivedStateFromProps(props, state) {
    return {
      hasError: props.hasError
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.hasError !== nextState.hasError
  }

  render() {
    const { accept, guid, classes, className, text, multiple } = this.props
    const { hasError } = this.state
    return (
      <div>
        <input
          className={classes.input}
          id={guid}
          type='file'
          multiple={multiple || undefined}
          accept={accept}
          onChange={this.onChange}
          ref={(ref) => (this.filePicker = ref)}
        />
        <label htmlFor={guid}>
          <Button
            className={clsx({
              [classes.button]: true,
              [classes.error]: hasError,
              [className]: className
            })}
            variant={ButtonVariantOutlined}
            component='span'
            startIcon={<CloudUploadIcon />}
          >
            {text}
          </Button>
        </label>
      </div>
    )
  }
}

UploadButton.propTypes = {
  accept: PropTypes.string,
  text: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  hasError: PropTypes.bool
}

UploadButton.defaultProps = {
  accept: 'image/*',
  text: 'Upload',
  multiple: false,
  hasError: false
}

export default compose(
  withGuid,
  withStyles(styles, { name: 'UploadButton' })
)(UploadButton)
