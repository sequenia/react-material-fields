import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/styles'
import withHelperText from './hocs/with_helper_text.js'
import withAutoDeletion from './hocs/with_auto_deletion.js'
import { compose } from 'recompose'

import Button from './buttons/button.js'
import { ButtonVariantOutlined } from './buttons/constants.js'
import UploadButton from './buttons/upload_button.js'
import { CircularProgress, FormHelperText } from '@material-ui/core'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative'
  },
  loadingRoot: {
    height: '50px !important'
  },
  title: {
    color: '#000',
    fontSize: '14px',
    marginBottom: '6px',
    textTransform: 'uppercase',
    fontWeight: '400'
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '10px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  progress: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  fade: {
    opacity: 0.2
  },
  delete: {
    color: '#f00',
    borderColor: 'rgba(255, 0, 0, 0.1)'
  },
  link: {
    fontSize: '14px',
    textTransform: 'uppercase',
    marginBottom: '10px',
    color: 'rgba(0, 0, 0, 0.54)',
    wordBreak: 'break-word',
    flexGrow: '1'
  }
})

/*
 * return (
 *   <FileField onChange = { (value) => {
 *                  // Some actions
 *                } }
 *                uploaded = { (file) => {
 *                  return promise;
 *                }}
 *                value = { {id: 1, url: "https://path/to/image.pdf" }} } />
 * )
 */

class FileField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      uploading: false
    }
  }

  onFileChange = (file) => {
    this.setState({ local: file, error: undefined })
    this.upload(file)
  }

  onDeleteClick = (event) => {
    this.setState({ value: undefined, local: undefined, error: undefined })
    this.onChange(undefined)
  }

  onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  upload = (file) => {
    this.setState({ uploading: true, error: undefined, local: undefined })
    this.props
      .uploader(file)
      .then((uploadedFile) => {
        this.setState({ uploading: false, value: uploadedFile })
        this.onChange(uploadedFile)
      })
      .catch((error) => {
        this.setState({ uploading: false, error: error })
        this.onChange(undefined)
      })
  }

  static getDerivedStateFromProps(props, state) {
    let value

    const propsValue = props.value
    let defaultValue = state.defaultValue
    const stateValue = state.value

    if (JSON.stringify(defaultValue) !== JSON.stringify(propsValue)) {
      defaultValue = propsValue
      value = propsValue
    } else {
      value = stateValue
    }

    // eslint-disable-next-line no-use-before-define
    const hasErrors = Boolean(hasErrors)
    let errorMessages = []

    if (state.error && state.error.errorData && state.error.errorData.fields) {
      errorMessages = state.error.errorData.fields.attachment || []
    }

    return {
      ...state,
      hasErrors: hasErrors,
      errorMessages: errorMessages,
      value: value && value.id ? value : undefined,
      local: value && value.file ? value.file : undefined,
      defaultValue: defaultValue
    }
  }

  componentDidMount() {
    const { local } = this.state
    if (local) {
      this.upload(local)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.uploading !== prevState.uploading) {
      this.onChange(this.state.value)
    }
    const { launchCountdown } = this.props
    if (this.state.error && !prevState.error) {
      launchCountdown()
    }
  }

  render() {
    const {
      buttonClassName,
      classes,
      displayName,
      allowDelete,
      accept,
      allowSelfLoad,
      deleteText
    } = this.props
    // eslint-disable-next-line no-unused-vars
    const { local, value, uploading, error, hasErrors } = this.state
    const buttons = []

    if (allowSelfLoad && !uploading && !local && !value) {
      buttons.push(
        <UploadButton
          className={buttonClassName}
          key='upload'
          multiple={false}
          onChange={this.onFileChange}
          accept={accept}
        />
      )
    }

    if (!uploading && allowDelete && value) {
      buttons.push(
        <Button
          key='delete'
          className={clsx(classes.button, classes.delete)}
          component='span'
          variant={ButtonVariantOutlined}
          onClick={this.onDeleteClick}
        >
          {deleteText}
        </Button>
      )
    }
    return (
      <div
        className={clsx({
          [classes.root]: true,
          [classes.loadingRoot]: uploading
        })}
      >
        {displayName && <div className={classes.title}>{displayName}</div>}
        {error && <div className={classes.subtitle}>{error.message}</div>}
        {value && (
          <a
            href={value.url}
            target='_blank'
            rel='noreferrer'
            className={classes.link}
          >
            {value.filename}
          </a>
        )}

        {uploading && (
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        )}
        {error && (
          <div className={classes.errors}>
            {this.state.errorMessages.map((errorText) => (
              <FormHelperText error key={errorText}>
                {errorText}
              </FormHelperText>
            ))}
          </div>
        )}

        {buttons.length > 0 && <div className={classes.buttons}>{buttons}</div>}
      </div>
    )
  }
}

FileField.propTypes = {
  allowDelete: PropTypes.bool,
  uploader: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  accept: PropTypes.string
}

FileField.defaultProps = {
  allowDelete: true,
  allowSelfLoad: true,
  accept: '*/*',
  deleteText: 'Delete'
}

export default compose(
  withHelperText,
  withAutoDeletion,
  withStyles(styles, { name: 'FileField' })
)(FileField)
