import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default class EditItem extends React.Component {

  state = {
    description: '',
    due: new Date(this.props.taskInfo.due),
    priority: 1,
    isCompleted: false
  }

  componentDidMount() {
    this.setState({ isCompleted: this.props.taskInfo.isCompleted })
  }


  onClickEdit = (e) => {
    const taskInfo = { ...this.state, due: this.state.due.toISOString(), priority: Number(this.state.priority) }
    if(taskInfo.description.length===0) {
      alert('내용을 입력해주세요.')
      return 0
    }
    e.preventDefault()
    this.props.patchTask(this.props.taskInfo._id, taskInfo)
    this.props.handleEdit(e)
  }

  onClickCancel = (e) => {
    e.preventDefault()
    this.props.handleEdit(e)
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
  }
  handleDateChange = (date) => {
    this.setState({ due: date })
  }

  render() {
    const isCompleted = this.state.isCompleted
    return (
      <div className='editItem'>
        <div style={{ margin: '5px' }}>
          완료 여부 :
          <input
            type="checkbox"
            onChange={(e) => { this.setState({ isCompleted: e.target.checked }) }}
            checked={isCompleted} />
        </div>
        <div style={{ margin: '5px' }}>
          할 일 :
          <input
            style={{marginLeft: '10px'}}
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
        <button onClick={this.onClickEdit}>적용</button>
        <button onClick={this.onClickCancel}>취소</button>
      </div>
    )
  }
}