import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
  } from 'graphql';
  
  import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
  } from 'graphql-relay';
  
  import {
    Post,
    User,
    getPost,
    getPosts,
    getUser,
    getViewer,
    updateLikes,
  } from './database';

  import { sleep } from '../helpers';
  
  const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
      const {type, id} = fromGlobalId(globalId);
      if (type === 'Post') {
        return getPost(id);
      } else if (type === 'User') {
        return getUser(id);
      }
      return null;
    },
    (obj) => {
      if (obj instanceof Post) {
        return GraphQLPost;
      } else if (obj instanceof User) {
        return GraphQLUser;
      }
      return null;
    }
  );
  
  const GraphQLPost = new GraphQLObjectType({
    name: 'Post',
    fields: {
      id: globalIdField('Post'),
      text: {
        type: GraphQLString,
        resolve: (obj) => obj.text,
      },
      likes: {
        type: GraphQLInt,
        resolve: (obj) => obj.likes,
      },
      complete: {
        type: GraphQLBoolean,
        resolve: (obj) => obj.complete,
      },
    },
    interfaces: [nodeInterface],
  });
  
  const {
    connectionType: PostsConnection,
    edgeType: GraphQLPostEdge,
  } = connectionDefinitions({
    name: 'Post',
    nodeType: GraphQLPost,
  });
  
  const GraphQLUser = new GraphQLObjectType({
    name: 'User',
    fields: {
      id: globalIdField('User'),
      posts: {
        type: PostsConnection,
        args: {
          status: {
            type: GraphQLString,
            defaultValue: 'any',
          },
          ...connectionArgs,
        },
        resolve: (obj, {status, ...args}) =>
          connectionFromArray(getPosts(status), args),
      },
      totalCount: {
        type: GraphQLInt,
        resolve: () => getPosts().length,
      },
      completedCount: {
        type: GraphQLInt,
        resolve: () => getPosts('completed').length,
      },
    },
    interfaces: [nodeInterface],
  });
  
  const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
      viewer: {
        type: GraphQLUser,
        resolve: () => getViewer(),
      },
      node: nodeField,
    },
  });
  
  const GraphQLUpdateLikesMutation = mutationWithClientMutationId({
    name: 'UpdateLikes',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
      post: {
        type: GraphQLPost,
        resolve: ({localPostId}) => getPost(localPostId),
      },
    },
    mutateAndGetPayload: async ({id}) => {
      const localPostId = fromGlobalId(id).id;
      updateLikes(localPostId);
      // simulate a server delay
      await sleep(1000);
      return {localPostId};
    },
  });
  
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      updateLikes: GraphQLUpdateLikesMutation,
    },
  });
  
  export const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
  });
  