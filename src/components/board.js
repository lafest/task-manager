import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import axios from 'axios'
import Column from './column'
import { backend, initialData } from '../config.js'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`


export default class Board extends React.Component {

  deleteTask = (taskInfo, listName) => {
    axios.delete(backend + 'tasks/' + taskInfo._id)
  }

  
  patchTask = (id, patch) => {
    console.log(typeof patch.priority)
    axios.patch(backend + 'tasks/' + id, patch)
      .then((response) => console.log(response))
  }

  postTask = (taskInfo) => {
    axios.post(backend + 'tasks', taskInfo)
      .then((response) => console.log(response))
  }


  state = initialData


  componentDidMount = () => {
    let tasks = {}
    let columns = this.state.columns
    axios.get(backend + 'tasks')
      .then((response) => {
        response.data.tasks.map(v => {
          tasks[v._id] = v
        })
      })
      .then(() => Object.keys(tasks).map((v) => {
        columns[tasks[v].priority].taskIds.push(v)
      }))
      .then(() => this.setState({ tasks, columns }))
  }


  onDragStart = () => {
    //todo
  }

  onDragUpdate = (update) => {
    const { destination } = update
  }

  onDragEnd = result => {

    const { destination, source, draggableId } = result
    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
    }


    //moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState,()=>this.patchTask(draggableId,{priority: Number(finish.id)}))
  }


  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map((columnID) => {
            const column = this.state.columns[columnID]
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Container>
      </DragDropContext>

    )
  }
}