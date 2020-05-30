import React, { Component } from 'react'
import { Query } from 'react-apollo'

import graphql from 'graphql-tag'
import styled from 'styled-components'
import Item from './Item'
// You can seperate this query on to seperate file
const ALL_ITEMS_QUERY = graphql`
  query ALL_ITEMS_QUERY {
    items {
      id
      price
      title
      description
      image
      largeImage
    }
  }
`

const Center = styled.div`
  text-align: center;
`
const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`
class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error : {error.message}</p>
            return (
              <ItemList>
                {data.items.map(singleData => (
                  <Item item={singleData} />
                ))}
              </ItemList>
            )
          }}
        </Query>
      </Center>
    )
  }
}
export default Items
