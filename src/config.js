const backend = "https://ywyn08tnwh.execute-api.ap-northeast-2.amazonaws.com/dev/"

const initialData = {
  tasks: {},
  columns: {
    'overdue': {
      id: 'overdue',
      title: '끝내지 않은 일들',
      taskIds: []
    },
    '1': {
      id: '1',
      title: '우선순위 1단계',
      taskIds: []
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
  columnOrder: ['overdue' ,'1', '2', '3', '4', '5', 'end']
}

export { initialData, backend }