import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// render a list of links
class LinkList extends Component {

  render() {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return (<div> Loading </div>)
    }

    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return <div> Error </div>
    }
    const linksToRender = this.props.allLinksQuery.links
    return (
      <div className="pa3 pa5-ns">
        {linksToRender.map((link, index) => (
          <Link 
            index={index} 
            key={link.id} 
            link={link}
            updateStoreAfterVote={this._updateCacheAfterVote}
          />
        ))}
      </div>
    )
  }

  _updateCacheAfterVote = (store, createVote, linkId) => {
    // 1
    const data = store.readQuery({ query: ALL_LINKS_QUERY })
    
    // 2
    const votedLink = data.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes
    
    // 3
    store.writeQuery({ query: ALL_LINKS_QUERY, data })
  }

}

export const ALL_LINKS_QUERY = gql`
  # 2
  query AllLinksQuery {
    links {
      id
      url
      description
      votes {
        id
      }
    }
  }
`

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' }) (LinkList)