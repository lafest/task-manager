import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default class EditItem extends React.Component {

  state = {
    description: '',
    due: new Date(),
    priority: 1,
    isCompleted: false
  }

  onClickButton = (e) => {
    const taskInfo = { ...this.state, due: this.state.due.toISOString(), priority: Number(this.state.priority) }
    e.preventDefault()
    this.props.patchTask(taskInfo)
  }

  componentDidMount = () => {
    const taskInfo = this.props.taskInfo
    this.setState({
      description: taskInfo.description,
      priority: taskInfo.priority,
      isCompleted: taskInfo.isCompleted
    })
  }

  handleInputChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({ [name]: value })
    console.log(value)
    console.log(typeof Number(this.state.priority))
  }
  handleDateChange = (date) => {
    this.setState({ due: date })
  }


  render() {
    return (
      <div style={{border: 'solid 1px grey', padding: '10px'}}>
        <input
            type="checkbox"
            onChange={this.handleCheck}
            checked={this.stateisCompleted} />
        <div style={{margin: '5px'}}>
          할 일: 
          <input
            name='description'
            type='text'
            value={this.state.description}
            onChange={this.handleInputChange} />
        </div>
        <div style={{margin: '5px'}}>
          중요도 : 
          <select name='priority' value={this.state.priority} onChange={this.handleInputChange}>
            {[1, 2, 3, 4, 5].map(v => {
              return <option value={v} key={v}>{v}</option>
            })}
          </select>
        </div>
        <div style={{margin: '5px'}}>
          마감일 : 
          <DatePicker
            selected={this.state.due}
            onChange={date => this.handleDateChange(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            timeCaption="time"
            dateFormat="yyyy-MM-dd hh:mm" />
        </div>
        <button onClick={this.onClickButton}>수정하기</button>
        <button onClick={this.onClickButton}>취소</button>
      </div>
    )
  }
}