import React from 'react'
import User from './User'
import { Link } from 'react-router-dom'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class ListPage extends React.Component {

  render () {
    console.log('ListPage - render - environment', this.props.relay.environment)
    return (
      <div className='w-100 flex justify-center'>
        <Link to='/' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New User
        </Link>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.viewer.users.edges.map(({node}) =>
            <User key={node.id} post={node} viewer={this.props.viewer} />
          )}
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(ListPage, graphql`
  fragment ListPage_viewer on Viewer {
    ...User_viewer
    users(last: 100) @connection(key: "ListPage_users", filters: []) {
      edges {
        node {
          id
          email
        }
      }
    }
  }
`)
