import React, { Component } from 'react'
// graphql dependencies
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Link extends Component {
  render() {
    return (
      <div className='flex mt2 items-start'>
        <div className='flex items-center'>
          <span className='gray'>{this.props.index + 1}.</span>
          {<div className='ml1 gray f11 cursor' onClick={() => this._voteForLink()}>▲</div>}
        </div>
        <div className='ml1'>
          <div>{this.props.link.description} ({this.props.link.url})</div>
          <div 
            className='f6 lh-copy gray'
          >
            {this.props.createVoteMutation.loading ? "Loading Upvotes" : this.props.link.votes.length} votes | by {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'} 
          </div>
        </div>
      </div>
    )
  }
  
  _voteForLink = async () => {
    const linkId = this.props.link.id
    await this.props.createVoteMutation({
      variables: {
        linkId
      },
      update: (store, { data: { createVote } }) => {
        this.props.updateStoreAfterVote(store, createVote, linkId)
      }
    })
  }

}

const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($linkId: Int!) {
    createVote(linkId: $linkId) {
      link {
        votes {
          id
        }
      }
    }
  }
`

export default graphql(CREATE_VOTE_MUTATION, {
  name: 'createVoteMutation'
})(Link)
