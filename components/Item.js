import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Title from './styles/Title'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import formatPrice from '../lib/formatMoney'

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    console.log(this.props)
    return (
      <ItemStyles>
        {this.props.item.image && <img src={this.props.item.image} alt={this.props.item.title} />}
        <Title>
          <Link href={{ pathname: 'item', query: { id: this.props.item.id } }}>
            <a>{this.props.item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatPrice(this.props.item.price)}</PriceTag>
        <p>{this.props.item.description}</p>
        <div className='buttonList'>
          <Link href={{ pathname: 'update', query: { id: this.props.item.id } }}>
            <a>Edit</a>
          </Link>
          <button>Add to cart</button>
          <button>Delete</button>
        </div>
      </ItemStyles>
    )
  }
}
