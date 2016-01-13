import React from 'react'
import { fetchData } from '../../../../src'

import { connect } from 'react-redux'
import * as actions from '../../../server/clientServerMessage/actions'

function mapStateToProps (state) {
  return {
    clientServerMessage: state.clientServerMessage,
  }
}

@connect(mapStateToProps, actions)
@fetchData(actions.fetchDataClient, actions.fetchDataServer)
export default class ClientServer extends React.Component {
  render () {
    return (
      <div>
        {this.props.clientServerMessage}
      </div>
    )
  }
}
