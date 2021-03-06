import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import axios from 'axios'
import Column from './column'
import { backend, initialData } from '../config.js'
import { Button } from '@material-ui/core'

const Container = styled.div`
  display: flex;
`


export default class Board extends React.Component {

  state = { ...initialData, endVisible: false }

  deleteTask = (id) => {
    axios.delete(backend + 'tasks/' + id)
      .then((response) => response.data.task)
      .then((task) => {
        let tasks = this.state.tasks
        let columns = this.state.columns
        Object.keys(columns).map(v => {
          delete columns[v].taskIds[task._id]
        })
        delete tasks[task._id]
        this.setState({ tasks, columns })
      })
      .then(() => this.reorderBoard())
  }

  patchTask = (id, patch) => {
    axios.patch(backend + 'tasks/' + id, patch)
      .then((response) => response.data.task)
      .then((task) => {
        let tasks = this.state.tasks
        tasks[task._id] = task
        this.setState({ tasks })
      })
      .then(() => this.reorderBoard())
  }

  postTask = (taskInfo) => {
    axios.post(backend + 'tasks', taskInfo)
      .then(response => response.data.task)
      .then((task) => {
        let tasks = this.state.tasks
        tasks[task._id] = task
        this.setState({ tasks })
      })
      .then(() => this.reorderBoard())
  }

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
      .then(() => this.reorderBoard())
  }


  reorderBoard = () => {
    let tasks = this.state.tasks
    let columns = {}
    const todayMid = new Date(new Date(Date.now()).setHours(0, 0, 0, 0))

    Object.keys(this.state.columns).map(v => {
      const origin = this.state.columns[v]
      columns[v] = { ...origin, taskIds: [] }
    })

    Object.keys(tasks).forEach((v) => {
      if (new Date(new Date(tasks[v].due) - 60000 * 540) < todayMid) {
        if (tasks[v].isCompleted) columns['end'].taskIds.push(v)
        else columns['overdue'].taskIds.push(v)
      }
      else {
        columns[tasks[v].priority].taskIds.push(v)
      }
    })

    Object.keys(columns).map((v) => {
      columns[v].taskIds.sort((a, b) => {
        if (tasks[a].isCompleted ^ tasks[b].isCompleted) return tasks[a].isCompleted - tasks[b].isCompleted
        else if ((new Date(tasks[a].due) - new Date(tasks[b].due)) === 0) return tasks[a].description < tasks[b].description ? -1 : 1
        else return (new Date(tasks[a].due) - new Date(tasks[b].due))
      })
    })
    this.setState({ tasks, columns })
  }



  onClick = () => {
    const endVisible = !this.state.endVisible
    this.setState({ endVisible: endVisible })
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
      this.setState(newState, () => this.reorderBoard())
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
    this.setState(newState, () => this.patchTask(draggableId, { priority: Number(finish.id) }))
  }


  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder
            .filter(v =>
              !((this.state.columns[v].taskIds.length === 0 && v === 'overdue') || (!this.state.endVisible && v === 'end')))
            .map((columnID) => {
              const column = this.state.columns[columnID]
              const tasks = column.taskIds.filter(taskId => this.state.tasks[taskId] !== undefined).map(taskId => this.state.tasks[taskId])

              return <Column key={column.id} column={column} tasks={tasks} deleteTask={this.deleteTask} patchTask={this.patchTask} postTask={this.postTask} />
            })}
        </Container>
        <Button variant='contained' color="primary" onClick={this.onClick}>{this.state.endVisible ? '끝난 일 목록 접기' : '끝난 일 목록 보기'}</Button>
      </DragDropContext>

    )
  }
}