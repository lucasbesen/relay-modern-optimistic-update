import {
    commitMutation,
    graphql,
  } from 'react-relay';
  
  const mutation = graphql`
    mutation UpdateLikesMutation($input: UpdateLikesInput!) {
      updateLikes(input:$input) {
        todo {
          id
          likes
        }
      }
    }
  `;
  
  function getOptimisticResponse(likes, todo) {
    return {
      updateLikes: {
        todo: {
          id: todo.id,
          likes: likes,
        },
      },
    };
  }
  
  function commit(
    environment,
    likes,
    todo,
    useOptimisticResponse,
  ) {
    return commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {id: todo.id},
        },
        optimisticResponse: useOptimisticResponse ? getOptimisticResponse(likes, todo) : null,
      }
    );
  }
  
  export default {commit};
  