import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import graphql from 'graphql-tag'
import Router from 'next/router'
import formatMoney from '../lib/formatMoney'
import FormStyle from './styles/Form'
import ErrorMessage from '../components/ErrorMessage'

// GraphQL Mutation Query
const CREATE_ITEM_MUTATION = graphql`
  mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, $price: Int!, $image: String, $largeImage: String) {
    createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
      id
    }
  }
`

export default class createItem extends Component {
  state = {
    title: '',
    price: 0,
    description: '',
    image: '',
    largeImage: '',
  }

  onChangeHandler = e => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
    this.setState({
      [e.target.name]: value,
    })
  }

  onFileUpload = async e => {
    const file = e.target.files[0]
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'dipee_ecommerce')
    const res = await fetch('https://api.cloudinary.com/v1_1/bingodingo/image/upload', { method: 'POST', body: data })
    const dataResponse = await res.json()
    console.log(dataResponse)
    this.setState({
      image: dataResponse.secure_url,
      largeImage: dataResponse.eager[0].secure_url,
    })
  }
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(doCreateItem, { loading, error }) => (
          <FormStyle
            onSubmit={async e => {
              e.preventDefault()
              // Then trigger create Item
              // This will return data from graphql after mutated
              const res = await doCreateItem()
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id },
              })
              console.log(res, 'This is log from createItem.js')
            }}
          >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor='file'>
                Title
                <input type='file' name='file' id='file' placeholder='Upload Image' required onChange={this.onFileUpload} />
              </label>
              <label htmlFor='title'>
                Title
                <input
                  type='text'
                  name='title'
                  id='title'
                  placeholder='Title'
                  required
                  value={this.state.title}
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
                  value={this.state.price}
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
                  value={this.state.description}
                  onChange={this.onChangeHandler}
                />
              </label>
              <button type='submit'>Submit</button>
            </fieldset>
          </FormStyle>
        )}
      </Mutation>
    )
  }
}
