import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/styles'
import withHelperText from './hocs/with_helper_text.js'
import withAutoDeletion from './hocs/with_auto_deletion.js'
import { compose } from 'recompose'

import Button from './buttons/button.js'
import UploadButton from './buttons/upload_button.js'
import { ButtonVariantOutlined } from './buttons/constants.js'
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CircularProgress,
  CardHeader,
  CardContent,
  FormHelperText
} from '@material-ui/core'

const styles = (theme) => ({
  fileHeader: {
    padding: '9px 12px',
    '& .MuiCardHeader-subheader': {
      fontSize: '13px',
      wordBreak: 'break-all'
    }
  },
  mediaContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '50px'
  },
  media: {
    height: '115px',
    flexGrow: '1'
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
  }
})
/*
 * return (
 *   <ImageField onChange = { (value) => {
 *                  // Some actions
 *                } }
 *                uploaded = { (file) => {
 *                  return promise;
 *                }}
 *                value = { {id: 1, url: "https://path/to/image.jpg" }} } />
 * )
 */
class ImageField extends React.Component {
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
      .then((image) => {
        this.setState({ uploading: false, value: image })
        this.onChange(image)
      })
      .catch((error) => {
        this.setState({ uploading: false, error: error })
        this.onChange(undefined)
      })
  }

  getSubheader = () => {
    const { uploading, uploadingText, notUploadedText, value } = this.state

    if (value && value.filename) {
      return value.filename
    }
    if (uploading) {
      return uploadingText
    }
    return notUploadedText
  }

  getErrorMessages = () => {
    const error = this.state.error

    if (error && error.errorData && error.errorData.fields) {
      return error.errorData.fields.attachment || []
    } else {
      return []
    }
  }

  componentDidMount() {
    const { local } = this.state
    if (local) {
      this.upload(local)
    }
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

    return {
      ...state,
      value: value && value.id ? value : undefined,
      local: value && value.file ? value.file : undefined,
      defaultValue: defaultValue
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
      allowSelfLoad,
      deleteText
    } = this.props
    const { local, value, uploading, error } = this.state
    const buttons = []

    if (!uploading && !local && !value && allowSelfLoad) {
      buttons.push(
        <UploadButton
          className={buttonClassName}
          key='upload'
          onChange={this.onFileChange}
          multiple={false}
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
      <Card className={classes.root}>
        <CardHeader
          title={displayName}
          subheader={error ? error.message : this.getSubheader()}
          className={classes.fileHeader}
        />
        <CardActionArea className={classes.mediaContainer}>
          {value && (
            <CardMedia className={classes.media} image={value.urls.medium} />
          )}
          {uploading && (
            <div className={classes.progress}>
              <CircularProgress />
            </div>
          )}
          {error && (
            <CardContent>
              {this.getErrorMessages().map((errorText) => (
                <FormHelperText error key={errorText}>
                  {errorText}
                </FormHelperText>
              ))}
            </CardContent>
          )}
        </CardActionArea>
        {buttons.length > 0 && <CardActions>{buttons}</CardActions>}
      </Card>
    )
  }
}

ImageField.propTypes = {
  allowDelete: PropTypes.bool,
  allowSelfLoad: PropTypes.bool,
  uploader: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  file: PropTypes.object,
  value: PropTypes.object
}

ImageField.defaultProps = {
  allowDelete: true,
  allowSelfLoad: true,
  deleteText: 'Delete',
  notUploadedText: 'Not uploaded',
  uploadingText: 'Uploading'
}

export default compose(
  withHelperText,
  withAutoDeletion,
  withStyles(styles, { name: 'ImageField' })
)(ImageField)
