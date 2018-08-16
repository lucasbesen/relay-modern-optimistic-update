import TodoTextInput from './TodoTextInput';

import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import List from './List';

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
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>
              Be Optimistic
            </h1>
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
