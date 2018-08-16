import * as React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import UpdateLikesMutation from '../mutations/UpdateLikesMutation';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-top: 10px;
`;

const Text = styled.span`
  font-size: 24px;
`;

class Post extends React.Component {
  handleUpdateLike = () => {
    UpdateLikesMutation.commit(
      this.props.relay.environment,
      this.props.post,
      this.props.useOptimisticResponse,
    );
  };

  render() {
    return (
      <Wrapper>
        <Text>Like count - { this.props.post.likes }</Text>
        <Button size="small" color="primary" variant="contained" onClick={() => this.handleUpdateLike()}>
          Like
        </Button>
      </Wrapper>
    );
  }
}

export default createFragmentContainer(Post, {
  post: graphql`
    fragment Post_post on Post {
      complete,
      id,
      likes,
    }
  `,
  viewer: graphql`
    fragment Post_viewer on User {
      id,
    }
  `,
});
