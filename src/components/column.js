import React from 'react';
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@material-ui/core'

const Container = styled.div`
  min-height: 100px;
  height: auto;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 272px;
  flex: none;
  background-color: white

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  text-align : center;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`

export default class Column extends React.Component {

  state = {
    open: false, add: {
      description: '',
      due: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 16)
    }
  }

  onClickAdd = (e) => {
    e.preventDefault()
    this.props.postTask({ ...this.state.add, priority: Number(this.props.column.id) })
    this.setState({ open: false, add: { description: '', due: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 16) } })
  }

  render() {
    const offset = new Date().getTimezoneOffset() * 60000
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable
          droppableId={this.props.column.id}
          type={this.props.column.id === 'end'
            ? 'end'
            : this.props.column.id === 'overdue'
              ? 'overdue'
              : 'active'}
        >
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => <Task key={task._id} task={task} index={index} list={this.props.column.id} deleteTask={this.props.deleteTask} patchTask={this.props.patchTask} />)}
              {provided.placeholder}
              {(this.props.column.id !== 'end' && this.props.column.id !== 'overdue') && <Button color='primary' onClick={() => this.setState({ open: true })}>할 일 추가</Button>}
              <Dialog open={this.state.open}>
                <DialogTitle>할 일 추가</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus={true}
                    margin="dense"
                    id="name"
                    label="할 일"
                    fullWidth
                    placeholder='할 일'
                    onChange={(e) => this.setState({ add: { ...this.state.add, description: e.target.value } })}
                  />
                  <TextField
                    id="datetime-local"
                    label="마감일"
                    type="datetime-local"
                    defaultValue={new Date(Date.now() - offset).toISOString().substring(0, 16)}
                    onChange={(e) => this.setState({ add: { ...this.state.add, due: e.target.value } })}
                  />
                </DialogContent>
                <DialogActions>
                  <Button variant='contained' color="primary" onClick={(e) => this.onClickAdd(e)}>추가</Button>
                  <Button onClick={() => this.setState({ open: false })}>닫기</Button>
                </DialogActions>
              </Dialog>
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}