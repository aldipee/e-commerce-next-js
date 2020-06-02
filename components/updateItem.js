import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import graphql from 'graphql-tag'
import Router from 'next/router'
import formatMoney from '../lib/formatMoney'
import FormStyle from './styles/Form'
import ErrorMessage from '../components/ErrorMessage'

// GraphQL Mutation Query
const SINGLE_ITEM_QUERY = graphql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`

const UPDATE_ITEM_MUTATION = graphql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`

class updateItem extends Component {
  state = {}

  onChangeHandler = e => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
    this.setState({
      [e.target.name]: value,
    })
  }

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault()
    console.log(this.state)
    const res = await updateItemMutation({
      variables: {
        id: this.props.itemId,
        ...this.state,
      },
    })
    console.log('UPDATEEEDD!')
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.itemId }}>
        {(data, loading) => {
          console.log(data, 'This is data from updateItem.js on Single Item Query')
          const { item } = data.data
          if (loading) return <p>Loading.....</p>
          if (!data.data.item) return <p>No data found</p>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(doUpdateItem, { loading, error }) => (
                <FormStyle onSubmit={e => this.updateItem(e, doUpdateItem)}>
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor='title'>
                      Title
                      <input
                        type='text'
                        name='title'
                        id='title'
                        placeholder='Title'
                        required
                        defaultValue={item.title}
                        onChange={this.onChangeHandler}
                      />
                    </label>

                    <label htmlFor='price'>
                      Price
                      <input
                        type='number'
                        name='price'
                        id='price'
                        placeholder='Price'
                        required
                        defaultValue={item.price}
                        onChange={this.onChangeHandler}
                      />
                    </label>
                    <label htmlFor='description'>
                      Description
                      <textarea
                        type='text'
                        name='description'
                        id='description'
                        placeholder='Add a Description'
                        required
                        defaultValue={item.description}
                        onChange={this.onChangeHandler}
                      />
                    </label>
                    <button type='submit'>{loading ? 'Saving...' : 'Submit'}</button>
                  </fieldset>
                </FormStyle>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}
export default updateItem
export { UPDATE_ITEM_MUTATION }
