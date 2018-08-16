import * as React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import Post from './Post';

class PostList extends React.Component {
  renderPosts() {
    return this.props.viewer.posts.edges.map(edge =>
      <Post
        key={edge.node.id}
        post={edge.node}
        viewer={this.props.viewer}
        useOptimisticResponse={this.props.useOptimisticResponse}
      />
    );
  } 
  render() {
    return (
      <div>{this.renderPosts()}</div>
    );
  }
}

export default createFragmentContainer(PostList, {
  viewer: graphql`
    fragment PostList_viewer on User {
      posts(
        first: 1
      ) @connection(key: "PostList_posts") {
        edges {
          node {
            id,
            ...Post_post,
          },
        },
      },
      id,
      ...Post_viewer,
    }
  `,
});
