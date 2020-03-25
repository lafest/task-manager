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
  FormControl,
  FormControlLabel,
  FormLabel
} from '@material-ui/core';


const Container = styled.div`
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: 'white';

  display: flex;
`

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`

const Description = styled.div`
    flex-grow: 1;
    overflow: hidden;
    word-wrap: break-word;
`

const Due = styled.div`
  white-space: nowrap;
  background-color: skyblue
`

export default class Task extends React.Component {

  state = {
    open: false, patch: {
      description: '',
      priority: '1',
      due: ''
    }
  }

  onChange = (e) => {
    console.log(this.props)
  }

  onClickEdit = (e) => {
    e.preventDefault()
    const { patch } = this.state
    console.log(patch)
  }




  render() {

    return (
      <Draggable
        draggableId={this.props.task._id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Handle {...provided.dragHandleProps} />
            <Checkbox checked={this.props.task.isCompleted} onChange={this.onChange} />
            <Description>{this.props.task.description}</Description>
            <Due>due : {this.props.task.due.substring(0, 10) + ' ' + this.props.task.due.substring(11, 16)}</Due>


            <Dialog open={this.state.open}>
              <DialogTitle>할 일 수정</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus={true}
                  margin="dense"
                  id="name"
                  label="할 일"
                  fullWidth
                  placeholder={this.props.task.description}
                  onChange={(e) => this.setState({ patch: { ...this.state.patch, description: e.target.value } })}
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">우선순위</FormLabel>
                  <RadioGroup row value={this.state.patch.priority} onChange={(e) => this.setState({ patch: { ...this.state.patch, priority: e.target.value } })}>
                    <FormControlLabel value='1' control={<Radio />} label="1" />
                    <FormControlLabel value='2' control={<Radio />} label="2" />
                    <FormControlLabel value='3' control={<Radio />} label="3" />
                    <FormControlLabel value='4' control={<Radio />} label="4" />
                    <FormControlLabel value='5' control={<Radio />} label="5" />
                  </RadioGroup>
                </FormControl>
                <TextField
                  id="datetime-local"
                  label="마감일"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
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