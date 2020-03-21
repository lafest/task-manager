import React from 'react'
import TodoItem from './todoItem'

export default class TodoList extends React.Component {

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (ev, destList) => {
    const id = ev.dataTransfer.getData("id")
    const listName = ev.dataTransfer.getData("listName")
    console.log(listName)
    if (endList.includes(listName) || (endList.includes(this.props.listName) && priorityList.includes(listName)))
      console.log('cannot move end between priority')
    else {
      console.log(this.props.listName[5])
      this.props.patchTask(id, { priority: Number(this.props.listName[5]) })
    }
    console.log('ondrop')
  }




  static defaultProps = { listName: 'todo' }

  render() {
    const listName = this.props.listName
    return (
      <div
        style={{ border: 'solid black 1px', width: '500px', margin: '10px', padding: '10px' }}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => this.onDrop(e, listName)}>
        {this.props.listName}
        {this.props.list.length === 0 &&
          <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'grey' }}>일정이 없습니다.</p>}
        {this.props.list.map((v, i) => {
          return (
            <TodoItem
              deleteTask={this.props.deleteTask}
              patchTask={this.props.patchTask}
              listName={listName}
              itemInfo={v}
              key={i} />)
        })}
      </div>
    )
  }
}

const endList = ['기한이 지난 일들', '끝!']
const priorityList = ['우선순위 1단계', '우선순위 2단계', '우선순위 3단계', '우선순위 4단계', '우선순위 5단계']