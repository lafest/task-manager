import React from 'react'
import EditItem from './editItem'

export default class TodoItem extends React.Component {

  state = { edit: false, look: false }

  onDragStart = (ev, itemInfo) => {
    ev.dataTransfer.setData("id", itemInfo._id)
    ev.dataTransfer.setData("listName", this.props.listName)
  }

  handleCheck = (e) => {
    e.preventDefault()
    this.props.patchTask(this.props.itemInfo._id, { isCompleted: !this.props.itemInfo.isCompleted })
  }

  handleOnClickRemove = (e) => {
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
    return (<>
      {edit && <EditItem taskInfo={itemInfo} patchTask={this.props.patchTask} handleEdit={this.handleEdit} />}
      {
        !edit && <div
          draggable
          onDragStart={(e) => this.onDragStart(e, itemInfo)}
          onMouseEnter={(e) => this.setState({ look: true })}
          onMouseLeave={(e) => this.setState({ look: false })}
          className='todoItem'>
          <span className='ellipsisText' >
            <input
              type="checkbox"
              onChange={this.handleCheck}
              checked={isCompleted} />
            <div className={(isCompleted ? 'complete' : '') + ' ' + (this.state.look ? 'spread' : 'ellipsisText')}>
              {itemInfo.description}
            </div>
          </span>
          <span style={{ whiteSpace: 'nowrap' }}>
            <span className={isCompleted ? 'complete' : ''}>
              {itemInfo.due.substring(0, 10) + ' ' + itemInfo.due.substring(11, 16)}
            </span>
            <button onClick={(e) => this.handleEdit(e)} style={{ marginLeft: '10px' }}>수정</button>
            <button onClick={(e) => this.handleOnClickRemove(e)}>삭제</button>
          </span>
        </div>
      }</>
    )
  }
}