import React, { Component } from 'react'

// graphql dependencies
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ALL_LINKS_QUERY } from './LinkList'

class CreateLink extends Component {

  state = {
    description: '',
    url: ''
  }

  render() {
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the link'
          />
          <input
            className='mb2'
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the link'
          />
        </div>
        <button
          onClick={() => this._createLink()}
        >
          Submit
        </button>
      </div>
    )
  }

  // function defined as a class property so it has access to this
  _createLink = async () => {
    const { description, url } = this.state
    await this.props.createLinkMutation({
      variables: {
        description,
        url
      },
      update: (store, { data: { createLink } }) => {
        const data = store.readQuery({ query: ALL_LINKS_QUERY })
        data.links.splice(0,0,createLink)
        store.writeQuery({
          query: ALL_LINKS_QUERY,
          data
        })
      }
    })

    this.props.history.push('/')
  }

}

const CREATE_LINK_MUTATION = gql`
  # 2
  mutation CreateLinkMutation($description: String!, $url: String!) {
    createLink(
      description: $description,
      url: $url,
    ) {
      id
      url
      description
    }
  }
`

export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation'})(CreateLink)
