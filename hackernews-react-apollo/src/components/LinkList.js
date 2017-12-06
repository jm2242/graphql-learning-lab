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
      <div>
        {linksToRender.map(link => (
          <Link key={link.id} link={link}/>
        ))}
      </div>
    )
  }

}

const ALL_LINKS_QUERY = gql`
  # 2
  query AllLinksQuery {
    links {
      id
      url
      description
    }
  }
`

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' }) (LinkList)