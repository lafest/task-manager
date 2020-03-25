const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'aaaa' },
    'task-2': { id: 'task-2', content: 'bbbaafdsafdsafdsafdsafdsafdsafdsb' },
    'task-3': { id: 'task-3', content: 'cccc' },
    'task-4': { id: 'task-4', content: 'dddd' },
  },
  columns: {
    'overdue': {
      id: 'overdue',
      title: '끝내지 않은 일들',
      taskIds: ['task-1', 'task-2', 'task-4']
    },
    '1': {
      id: '1',
      title: '우선순위 1단계',
      taskIds: ['task-3']
    },
    '2': {
      id: '2',
      title: '우선순위 2단계',
      taskIds: []
    },
    '3': {
      id: '3',
      title: '우선순위 3단계',
      taskIds: []
    },
    '4': {
      id: '4',
      title: '우선순위 4단계',
      taskIds: []
    },
    '5': {
      id: '5',
      title: '우선순위 5단계',
      taskIds: []
    },
    'end': {
      id: 'end',
      title: '끝!',
      taskIds: []
    }
  },
  columnOrder: ['overdue', '1', '2', '3', '4', '5', 'end']
}

export default initialData