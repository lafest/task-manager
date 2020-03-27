import React from 'react';
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import {
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
} from '@material-ui/core';

import { Edit, Delete } from '@material-ui/icons'


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: 'white';
  position: relative;
  background-color: whitesmoke;

`

const Description = styled.div`
  overflow: hidden;
  word-wrap: break-word;
  ${ ({ isCompleted }) => isCompleted && `
    text-decoration: line-through;
    color: grey;
  `}
`

const Due = styled.div`
  white-space: nowrap;
  padding: 8px;
  background-color: skyblue;
`

const Option = styled.div`
  position: absolute;
  bottom: 0px;
  right: 5px;
`

export default class Task extends React.Component {

  state = {
    visible: true,
    open: false,
    hover: false,
    patch: {
      description: this.props.task.description,
      priority: String(this.props.task.priority), // 이거 숫자로 바꿔서 보내줘야함
      due: this.props.task.due
    }
  }

  onCheck = (e) => {
    this.props.patchTask(this.props.task._id, { isCompleted: e.target.checked })
  }

  onClickEdit = (e) => {
    e.preventDefault()
    const { patch } = this.state
    this.props.patchTask(this.props.task._id, { ...patch, priority: Number(patch.priority) })
    this.setState({ open: false })
  }

  onClickDelete = (e) => {
    e.preventDefault()
    this.setState({ visible: false })
    const sto = setTimeout(() => {
      this.props.deleteTask(this.props.task._id)
    }, 500)

    return ()=>clearTimeout(sto)
  }



  render() {

    return (
      <Draggable
        draggableId={this.props.task._id}
        index={this.props.index}
      >
        {(provided, snapshot) => (

          <Container
            className={this.state.visible ? '' : 'delete'}
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
            onMouseOver={e => this.setState({ hover: true })}
            onMouseLeave={e => this.setState({ hover: false })}
          >

            <FormControlLabel
              control={<Checkbox checked={this.props.task.isCompleted} onChange={this.onCheck} name="checkedA" />}
              label={'Due : ' + this.props.task.due.substring(0, 10) + ' ' + this.props.task.due.substring(11, 16)}
            />

            {this.state.hover &&
              <Option>
                <Edit onClick={(e) => this.setState({ open: true })} />
                <Delete onClick={(e) => this.onClickDelete(e)} />
              </Option>}
            <Description isCompleted={this.props.task.isCompleted} >{this.props.task.description}</Description>

            <Dialog open={this.state.open}>
              <DialogTitle>할 일 수정</DialogTitle>
              <DialogContent>
                <TextField
                  defaultValue={this.state.patch.description}
                  autoFocus={true}
                  margin="dense"
                  id="name"
                  label="할 일"
                  fullWidth
                  placeholder={this.props.task.description}
                  onChange={(e) => this.setState({ patch: { ...this.state.patch, description: e.target.value } })}
                />
                <FormLabel >우선순위</FormLabel>
                <RadioGroup row value={this.state.patch.priority} onChange={(e) => this.setState({ patch: { ...this.state.patch, priority: e.target.value } })}>
                  <FormControlLabel value='1' control={<Radio />} label="1" />
                  <FormControlLabel value='2' control={<Radio />} label="2" />
                  <FormControlLabel value='3' control={<Radio />} label="3" />
                  <FormControlLabel value='4' control={<Radio />} label="4" />
                  <FormControlLabel value='5' control={<Radio />} label="5" />
                </RadioGroup>
                <TextField
                  id="datetime-local"
                  label="마감일"
                  type="datetime-local"
                  defaultValue={this.props.task.due.substring(0, 19)}
                  onChange={(e) => this.setState({ patch: { ...this.state.patch, due: e.target.value } })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={(e) => this.onClickEdit(e)}>수정</Button>
                <Button onClick={() => this.setState({ open: false })}>닫기</Button>
              </DialogActions>
            </Dialog>
          </Container>
        )}
      </Draggable>
    )
  }
}
