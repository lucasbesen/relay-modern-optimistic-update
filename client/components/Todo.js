import UpdateLikesMutation from '../mutations/UpdateLikesMutation';
import Button from '@material-ui/core/Button';
import TodoTextInput from './TodoTextInput';

import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-top: 10px;
`;

const Text = styled.span`
  font-size: 24px;
`;

class Todo extends React.Component {
  state = {
    isEditing: false,
  };
  _handleLabelDoubleClick = () => {
    this._setEditMode(true);
  };
  _handleTextInputCancel = () => {
    this._setEditMode(false);
  };
  _handleTextInputSave = () => {
    this._setEditMode(false);
    UpdateLikesMutation.commit(
      this.props.relay.environment,
      this.props.todo.likes + 1,
      this.props.todo,
      this.props.useOptimisticResponse,
    );
  };
  _setEditMode = (shouldEdit) => {
    this.setState({isEditing: shouldEdit});
  };
  render() {
    return (
      <Wrapper>
        <Text>Like count - { this.props.todo.likes }</Text>
        <Button size="small" color="primary" variant="contained" onClick={() => this._handleTextInputSave()}>
          Like
        </Button>
      </Wrapper>
    );
  }
}

export default createFragmentContainer(Todo, {
  todo: graphql`
    fragment Todo_todo on Todo {
      complete,
      id,
      text,
      likes,
    }
  `,
  viewer: graphql`
    fragment Todo_viewer on User {
      id,
      totalCount,
      completedCount,
    }
  `,
});
