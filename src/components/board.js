import React from 'react'
import { TodoList, AddTask } from './boardElements'
import axios from 'axios'
import config from './../config.json'

class Board extends React.Component {

  state = {
    rawTasks: [],
    add: false,
    tasks: {
      '기한이 지난 일들': [],
      '우선순위 1단계': [],
      '우선순위 2단계': [],
      '우선순위 3단계': [],
      '우선순위 4단계': [],
      '우선순위 5단계': [],
      '끝!': []
    }
  }

  toggleAddTask = () => {
    const add = this.state.add
    this.setState({ add: !add })
  }

  deleteTask = (taskInfo, listName) => {
    let tasks = this.state.tasks
    axios.delete(config.backend + 'tasks/' + taskInfo._id)
    tasks[listName] = tasks[listName].filter((v) => v !== taskInfo)
    this.setState({ tasks: tasks })
  }
  patchTask = (id, patch) => {
    const rawTasks = this.state.rawTasks
    axios.patch(config.backend + 'tasks/' + id, patch)
      .then(() => rawTasks.map((v) => {
        if (v._id === id) {
          Object.assign(v, patch)
        }
      }))
      .then(() => this.sortTasks(rawTasks))
  }

  postTask = (taskInfo) => {
    let rawTasks = this.state.rawTasks
    axios.post(config.backend + 'tasks', taskInfo)
      .then((response) => rawTasks.push(response.data.task))
      .then(() => this.sortTasks(rawTasks))
  }

  sortTasks = (rawTasks) => {
    let tasks = {}
    _category.map((v) => {
      tasks[v] = []
    })
    let now = new Date()
    now.setHours(0, 0, 0, 0)
    rawTasks.map((v) => {
      const due = new Date(v.due)
      if (now - due > 0) {
        if (v.isCompleted) {
          tasks['끝!'].push(v)
        }
        else {
          tasks['기한이 지난 일들'].push(v)
        }
      }
      else {
        tasks['우선순위 ' + v.priority + '단계'].push(v)
      }
    })
    for (let [key, value] of Object.entries(tasks)) {
      value.sort((a, b) => {
        if (a.isCompleted && !b.isCompleted) return 1
        else if (!a.isCompleted && b.isCompleted) return -1
        else {
          const dueA = new Date(a.due)
          const dueB = new Date(b.due)
          return dueA - dueB
        }
      })
      tasks[key] = value
    }
    this.setState({ tasks: tasks })
  }

  getTask = () => {
    let state = this.state.tasks

    axios.get(config.backend + 'tasks')
      .then((response) => {
        this.setState({ rawTasks: response.data.tasks })
        let now = new Date()
        now.setHours(0, 0, 0, 0)
        response.data.tasks.map((v) => {
          const due = new Date(v.due)
          if (now - due > 0) {
            if (v.isCompleted) {
              state['끝!'].push(v)
            }
            else {
              state['기한이 지난 일들'].push(v)
            }
          }
          else {
            state['우선순위 ' + v.priority + '단계'].push(v)
          }
        })
      })
      .then(() => {
        for (let [key, value] of Object.entries(state)) {
          value.sort((a, b) => {
            if (a.isCompleted && !b.isCompleted) return 1
            else if (!a.isCompleted && b.isCompleted) return -1
            else {
              const dueA = new Date(a.due)
              const dueB = new Date(b.due)
              return dueA - dueB
            }
          })
          state[key] = value
        }
        this.setState({ tasks: state })
      })
  }

  componentDidMount = () => {
    this.getTask()
  }

  render() {
    const list = this.state.tasks
    let category = _category
    category.sort((a, b) => {
      if (a === '기한이 지난 일들') return -1
      else if (b === '기한이 지난 일들') return 1
      else if (a === '끝!') return 1
      else if (b === '끝!') return -1
      else if (list[a].length === 0 && list[b].length === 0) return a[5]-b[5]
      else if (list[a].length === 0 || list[b].length === 0) return list[b].length - list[a].length
      else if (list[a][0].isCompleted===true) return 1
      else if (list[b][0].isCompleted===true) return -1
      else {
        const dueA = new Date(list[a][0].due)
        const dueB = new Date(list[b][0].due)
        return dueA - dueB
      }
    })
    return (
      <div>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>

          <button onClick={this.toggleAddTask}>{this.state.add ? '접기' : '추가'}</button>
          <br />
          {this.state.add &&
            <AddTask postTask={this.postTask} toggleAddTask={this.toggleAddTask} />
          }

        </span>
        <br />
        <div className='board'>
          {category.filter(v => !(v === _category[0] && list[v].length === 0)).map((v, i) => {
            return (
              <TodoList
                deleteTask={this.deleteTask}
                patchTask={this.patchTask}
                postTask={this.postTask}
                listName={v}
                list={list[v]}
                key={i} />)
          })}
        </div>
      </div>
    )
  }
}

const _category = ['기한이 지난 일들', '우선순위 1단계', '우선순위 2단계', '우선순위 3단계', '우선순위 4단계', '우선순위 5단계', '끝!']

export default Board