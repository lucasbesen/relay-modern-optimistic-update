import Todo from './Todo';

import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

class List extends React.Component {
  renderTodos() {
    return this.props.viewer.todos.edges.map(edge =>
      <Todo
        key={edge.node.id}
        todo={edge.node}
        viewer={this.props.viewer}
      />
    );
  }
  render() {
    const numTodos = this.props.viewer.totalCount;
    const numCompletedTodos = this.props.viewer.completedCount;
    return (
      <section className="main">
        <input
          checked={numTodos === numCompletedTodos}
          className="toggle-all"
          onChange={() => console.log('oioi')}
          type="checkbox"
        />
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>
        <ul className="todo-list">
          {this.renderTodos()}
        </ul>
      </section>
    );
  }
}

export default createFragmentContainer(List, {
  viewer: graphql`
    fragment List_viewer on User {
      todos(
        first: 2147483647  # max GraphQLInt
      ) @connection(key: "List_todos") {
        edges {
          node {
            id,
            complete,
            ...Todo_todo,
          },
        },
      },
      id,
      totalCount,
      completedCount,
      ...Todo_viewer,
    }
  `,
});
