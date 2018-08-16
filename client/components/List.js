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
    return (
      <section className="main">
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
        first: 2
      ) @connection(key: "List_todos") {
        edges {
          node {
            id,
            ...Todo_todo,
          },
        },
      },
      id,
      ...Todo_viewer,
    }
  `,
});
