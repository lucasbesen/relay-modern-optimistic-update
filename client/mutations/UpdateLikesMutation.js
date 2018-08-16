import {
    commitMutation,
    graphql,
  } from 'react-relay';
  
  const mutation = graphql`
    mutation UpdateLikesMutation($input: UpdateLikesInput!) {
      updateLikes(input:$input) {
        post {
          id
          likes
        }
      }
    }
  `;
  
  function getOptimisticResponse(likes, post) {
    return {
      updateLikes: {
        post: {
          id: post.id,
          likes: likes,
        },
      },
    };
  }
  
  function commit(
    environment,
    post,
    useOptimisticResponse,
  ) {
    return commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {id: post.id},
        },
        optimisticResponse: useOptimisticResponse ? getOptimisticResponse(post.likes + 1, post) : null,
      }
    );
  }
  
  export default {commit};
  