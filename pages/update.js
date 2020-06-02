import UpdateItem from '../components/updateItem'

function updateItem(props) {
  return <UpdateItem itemId={props.query.id} />
}

export default updateItem
