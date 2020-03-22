import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default class AddTask extends React.Component {

  state = {
    description: '',
    due: new Date(),
    priority: 1
  }

  onClickButton = (e) => {
    const taskInfo = { ...this.state, due: this.state.due.toISOString(), priority: Number(this.state.priority) }
    if(taskInfo.description.length===0) {
      alert('내용을 적어주세요.')
      return 0
    }
    e.preventDefault()
    this.props.postTask(taskInfo)
    this.props.toggleAddTask()
  }

  handleInputChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({ [name]: value })
  }
  handleDateChange = (date) => {
    this.setState({ due: date })
  }


  render() {
    return (
      <div style={{ display:'flex', flexDirection:'column', width: '250px',backgroundColor: 'rgb(223, 236, 241)', border: 'solid 1px skyblue', marginTop: '10px' }}>
        <div style={{ margin: '5px' }}>
          할 일 :
          <input
            style={{ marginLeft: '10px' }}
            name='description'
            type='text'
            value={this.state.description}
            onChange={this.handleInputChange} />
        </div>
        <div style={{ margin: '5px' }}>
          중요도 :
          <select name='priority' value={this.state.priority} onChange={this.handleInputChange}>
            {[1, 2, 3, 4, 5].map(v => {
              return <option value={v} key={v}>{v}</option>
            })}
          </select>
        </div>
        <div style={{ margin: '5px' }}>
          마감일 :
          <DatePicker
            selected={this.state.due}
            onChange={date => this.handleDateChange(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            timeCaption="time"
            dateFormat="yyyy-MM-dd HH:mm" />
        </div>
        <button onClick={this.onClickButton} style={{margin: '10px 50px 0px 50px'}}>추가하기</button>
        <br />
      </div>
    )
  }
}