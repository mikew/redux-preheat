import React from 'react'
import ActiveLink from './ActiveLink'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <div className="container">
          <div className="row">
            <ul className="nav nav-pills nav-justified">
              <li><ActiveLink className="" to='/' onlyActiveOnIndex={true}>Home</ActiveLink></li>
              <li><ActiveLink className="" to='/todos'>Todos</ActiveLink></li>
              <li><ActiveLink className="" to='/silly'>Silly Route</ActiveLink></li>
            </ul>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
