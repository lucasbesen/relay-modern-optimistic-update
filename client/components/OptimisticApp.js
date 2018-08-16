import TodoTextInput from './TodoTextInput';

import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

class OptimisticApp extends React.Component {
  _handleTextInputSave = (text) => {
    AddTodoMutation.commit(
      this.props.relay.environment,
      text,
      this.props.viewer,
    );
  };
  render() {
    const hasTodos = this.props.viewer.totalCount > 0;
    console.log('oioioioioi');
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>
              todos
            </h1>
            <TodoTextInput
              autoFocus={true}
              className="new-todo"
              onSave={this._handleTextInputSave}
              placeholder="What needs to be done?"
            />
          </header>
          <List viewer={this.props.viewer} />
        </section>
      </div>
    );
  }
}

export default createFragmentContainer(OptimisticApp, {
  viewer: graphql`
    fragment OptimisticApp_viewer on User {
      id,
      totalCount,
      ...List_viewer,
    }
  `,
});
