import React from 'react'
import { SvgIcon } from '@material-ui/core'
import clsx from 'clsx'
import { withStyles } from '@material-ui/styles'

const styles = (theme) => ({
  root: {
    width: 24,
    height: 24,
    fill: 'transparent'
  }
})

class IcCheckMark extends React.Component {
  render() {
    const { classes, className } = this.props

    return (
      <SvgIcon className={clsx(classes.root, className)} viewBox='0 0 24 24'>
        <path
          d='M9.00016 16.17L4.83016 12L3.41016 13.41L9.00016 19L21.0002 7.00003L19.5902 5.59003L9.00016 16.17Z'
          fill='#9DC647'
        />
      </SvgIcon>
    )
  }
}

export default withStyles(styles)(IcCheckMark)
