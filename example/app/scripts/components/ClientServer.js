import React from 'react'
import { preheat } from 'redux-preheat'

import { connect } from 'react-redux'
import * as actions from '../../../server/clientServerMessage/actions'

function mapStateToProps (state) {
  return {
    clientServerMessage: state.clientServerMessage,
  }
}

@connect(mapStateToProps, actions)
@preheat(actions.preheatClient, actions.preheatServer)
export default class ClientServer extends React.Component {
  render () {
    return (
      <div>
        {this.props.clientServerMessage}
      </div>
    )
  }
}
