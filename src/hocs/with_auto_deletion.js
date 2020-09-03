import React from 'react'
import PropTypes from 'prop-types'
import { FormHelperText } from '@material-ui/core'

const WithAutoDeletion = (Component) => {
  class WithAutoDeletion extends React.Component {
    constructor(props) {
      super(props)

      this.state = {}
    }

    launchCountdown = () => {
      const {
        allowAutoDeleteOnError,
        autoDeleteTimeout,
        onAutoDelete
      } = this.props
      if (!allowAutoDeleteOnError) {
        return
      }

      this.setState({
        timeLeft: autoDeleteTimeout
      })

      this.intervalToken = setInterval(() => {
        const { timeLeft = autoDeleteTimeout } = this.state
        this.setState({
          timeLeft: timeLeft - 1
        })
      }, 1000)

      setTimeout(() => {
        clearInterval(this.intervalToken)
        this.setState({
          timeLeft: undefined
        })
        if (onAutoDelete) {
          onAutoDelete()
        }
      }, autoDeleteTimeout * 1000)
    }

    render() {
      const { timeLeft } = this.state
      const { timeLeftToDeleteText } = this.props
      return (
        <React.Fragment>
          <Component {...this.props} launchCountdown={this.launchCountdown} />
          {timeLeft && (
            <FormHelperText error>
              {`${timeLeftToDeleteText} ${timeLeft}s`}
            </FormHelperText>
          )}
        </React.Fragment>
      )
    }
  }

  WithAutoDeletion.propTypes = {
    allowAutoDeleteOnError: PropTypes.bool,
    autoDeleteTimeout: PropTypes.number,
    onAutoDelete: PropTypes.func
  }

  WithAutoDeletion.defaultProps = {
    allowAutoDeleteOnError: false,
    autoDeleteTimeout: 5,
    timeLeftToDeleteText: 'That will be removed automatically in'
  }

  return WithAutoDeletion
}

export default WithAutoDeletion
