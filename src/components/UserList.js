import React, { Component } from 'react';
import {
  QueryRenderer,
  graphql,
  createPaginationContainer,
} from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from '../createRelayEnvironment';

class UserList extends Component {
  render() {
    const { users } = this.props.viewer;

    console.log('====================================');
    console.log(users);
    console.log('====================================');

    return (
      <div>
        {users.edges.map(user => <p key={user.node.id}>{user.node.name}</p>)}
     
      </div>
    );
  }
}

const UserListPaginationContainer = createPaginationContainer(
  UserList,
  {
    viewer: graphql`
      fragment UserList_viewer on Viewer {
        users(
          first: $count
          after: $cursor
        ) @connection(key: "UserList_users") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              name
              email
            }
          }
        }
      } 
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.users;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
      };
    },
    variables: { cursor: null },
    query: graphql`
      query UserListPaginationQuery (
        $count: Int!,
        $cursor: String
      ) {
        viewer {
          ...UserList_viewer
        }
      }
    `,
  },
);


const UserListQueryRenderer = () => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
      query UserListQuery(
        $count: Int!,
        $cursor: String
      ) {
        viewer {
          ...UserList_viewer
        }
      }
    `}
      variables={{ cursor: null, count: 10 }}
      render={({ error, props }) => {
        if (props) {
          return <UserListPaginationContainer viewer={props.viewer} />;
        } else {
          return (
            <p>Loading</p>
          )
        }
      }}
    />
  )
};

// Copies non-react specific statics from a child component to a parent component. Similar to Object.assign, but with React static keywords blacklisted from being overridden.
export default hoistStatics(UserListQueryRenderer, UserList);
