import React from 'react'
import EditItem from './editItem'

export default class TodoItem extends React.Component {

  state = { edit: false }

  onDragStart = (ev, itemInfo) => {
    ev.dataTransfer.setData("id", itemInfo._id)
    ev.dataTransfer.setData("listName", this.props.listName)
  }

  handleCheck = (e) => {
    e.preventDefault()
    this.props.patchTask(this.props.itemInfo._id, { isCompleted: !this.props.itemInfo.isCompleted })
  }

  handleOnClickRemove = (e) => {
    console.log(this.props.itemInfo._id)
    e.preventDefault()
    this.props.deleteTask(this.props.itemInfo, this.props.listName)
  }

  handleEdit = (e) => {
    const edit = this.state.edit
    e.preventDefault()
    this.setState({ edit: !edit })
  }

  render() {
    const isCompleted = this.props.itemInfo.isCompleted
    const edit = this.state.edit
    const itemInfo = this.props.itemInfo
    console.log(itemInfo)
    return (<>
      {edit && <EditItem taskInfo={itemInfo}/>}
      {
        !edit && <div
          draggable
          onDragStart={(e) => this.onDragStart(e, itemInfo)}
          style={{ border: 'solid skyblue 1px', margin: '10px', display: 'flex', justifyContent: 'space-between', maxWidth: '100%' }}>
          <span style={{ overflow: 'auto', /*textOverflow: 'ellipsis',*/ whiteSpace: 'nowrap' }}>
            <input
              type="checkbox"
              onChange={this.handleCheck}
              checked={isCompleted} />
            <span style={{ textDecoration: isCompleted ? 'line-through' : '', color: isCompleted ? 'grey' : '' }}>
              {itemInfo.description}
            </span>
          </span>
          <span style={{ whiteSpace: 'nowrap' }}>
            <span style={{ textDecoration: isCompleted ? 'line-through' : '', color: isCompleted ? 'grey' : '' }}>
              {itemInfo.due.substring(0, 10) + ' ' + itemInfo.due.substring(11, 16)}
            </span>
            <button onClick={(e) => this.handleEdit(e)}>수정</button>
            <button onClick={(e) => this.handleOnClickRemove(e)}>삭제</button>
          </span>
        </div>
      }</>
    )
  }
}