import React from 'react'
import { preheat } from '../../../../src'

import { connect } from 'react-redux'
import * as actions from '../../../server/todos/actions'

function mapStateToProps (state) {
  return {
    todos: state.todos.list,
  }
}

class Todo extends React.Component {
  render () {
    return <div>
      <input type="checkbox" checked={this.props.completed} disabled />
      {this.props.title}
    </div>
  }
}

@connect(mapStateToProps, actions)
@preheat(actions.preheat)
export default class Todos extends React.Component {
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group input-group-lg">
            <input
                ref="todoInput"
                type="text"
                className="form-control"
                placeholder="Todo ..."
                />
            <span className="input-group-btn">
              <button
                  onClick={this.handleSubmit}
                  className="btn btn-primary">
                Add Todo
              </button>
            </span>
          </div>
          <span className="help-block">
            Apologies that this is not a full-fledged TODO app with
            persistence.
          </span>
        </form>
        {
          this.props.todos.map((todo) => {
            return <Todo {...todo} key={todo.id} />
          })
        }
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let title = this.refs.todoInput.value
    this.refs.todoInput.value = ''

    this.props.addTodo({
      title,
      id: this.props.todos.length + 1,
      completed: false,
    })
  }
}
