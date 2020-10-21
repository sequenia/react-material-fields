import React from 'react'
import uuidv4 from 'uuid/v4'

const WithGuid = (Component) => {
  class WithGuid extends React.Component {
    componentDidMount() {
      this.guid = uuidv4()
    }

    render() {
      return <Component {...this.props} guid={this.guid} />
    }
  }

  return WithGuid
}

export default WithGuid
