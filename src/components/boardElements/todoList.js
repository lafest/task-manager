import React from 'react'
import TodoItem from './todoItem'

export default class TodoList extends React.Component {

  state = { dragItemHere: false }

  onDragOver = (e) => {
    e.preventDefault();
    if(!this.state.dragItemHere) this.setState({dragItemHere: true})
  }

  onDragLeave = (e) => {
    e.preventDefault()
    if(this.state.dragItemHere) this.setState({dragItemHere: false})
  }

  onDrop = (ev, destList) => {
    this.setState({dragItemHere: false})
    const id = ev.dataTransfer.getData("id")
    const listName = ev.dataTransfer.getData("listName")
    if (endList.includes(listName) || (endList.includes(this.props.listName) && priorityList.includes(listName)))
      alert('그렇게 움직일 수 없어요.')
    else if(this.props.listName !== listName) {
      this.props.patchTask(id, { priority: Number(this.props.listName[5]) })
    }
  }




  static defaultProps = { listName: 'todo' }

  render() {
    const listName = this.props.listName
    const dragItemHere = this.state.dragItemHere
    return (
      <div
        className='todoList'
        style={{ backgroundColor: dragItemHere? 'whitesmoke': 'white' }}
        onDragOver={(e) => this.onDragOver(e)}
        onDragLeave={(e)=>this.onDragLeave(e)}
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