import React from 'react'
import { fetchData } from '../../../../src'

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
@fetchData(actions.fetchData)
export default class Todos extends React.Component {
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="todoInput" />
          <button
              onClick={this.handleSubmit}
              className="btn btn-primary">
            Add Todo
          </button>
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
