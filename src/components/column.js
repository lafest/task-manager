import React from 'react';
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 500px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`

export default class Column extends React.Component {
  render() {
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
              {this.props.tasks.map((task, index) => <Task key={task._id} task={task} index={index} list={this.props.column.id} />)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}