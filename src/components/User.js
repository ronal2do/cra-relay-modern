import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter } from 'react-router-dom';

class User extends React.Component {

  render () {
    return (
      <div className='pa3 bg-black-05 ma3'>
        <div
          className='w-100'
          style={{
            backgroundSize: 'cover',
            paddingBottom: '100%',
          }}
        />
        <div className='pt3'>
          this.props.user.email
          <span 
            className='red f6 pointer dim' 
          >Delete</span>
        </div>
      </div>
    )
  }
}

const FragmentContainer =  createFragmentContainer(User, graphql`
  fragment User_viewer on Viewer {
    id
  }
  fragment User_detail on User {
    id
    email
    name
  }
`)

export default withRouter(FragmentContainer);