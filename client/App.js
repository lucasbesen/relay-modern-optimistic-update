
import React from 'react';
import ReactDOM from 'react-dom';

import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';

import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import OptimisticApp from './components/OptimisticApp';

function fetchQuery(
  operation,
  variables,
) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

ReactDOM.render(
  <QueryRenderer
    environment={modernEnvironment}
    query={graphql`
      query AppQuery {
        viewer {
          ...OptimisticApp_viewer
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (props) {
        return <OptimisticApp viewer={props.viewer} />;
      } else {
        return <div>Loading</div>;
      }
    }}
  />,
  document.getElementById('root')
);
