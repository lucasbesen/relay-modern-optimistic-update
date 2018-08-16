import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import styled from 'styled-components';

import List from './List';

const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1``;

class OptimisticApp extends React.Component {
  render() {
    return (
      <AppWrapper>
        <Title>Without Optimistic</Title>
        <List viewer={this.props.viewer} useOptimisticResponse={false} />
        <Title>With Optimistic</Title>
        <List viewer={this.props.viewer} useOptimisticResponse={true} />
      </AppWrapper>
    );
  }
}

export default createFragmentContainer(OptimisticApp, {
  viewer: graphql`
    fragment OptimisticApp_viewer on User {
      id,
      ...List_viewer,
    }
  `,
});
