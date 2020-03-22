##### 1. 실행 방법

----------

```bash
git clone https://github.com/lafest/task-manager.git
cd task-mamager
npm install
npm start
```



##### 2. 설명

-------

`React`를 이용해 개발했습니다.

모듈은 일정 추가/수정할 때 사용하는 `DatePicker` 외에는 사용하지 않았습니다.

일정을 추가/수정할 때 할 일이 비어있으면 사용자에게 알려주는 `alert` 를 띄우게 했습니다.

일정을 드래그할 때 어느 리스트 위에 있는지 보여주기 위해 `onDragEnter` , `onDragLeave` 이벤트를 이용해 일정 리스트의 색을 바꿨습니다.

일정 칸이 비어있는 경우 `일정이 없습니다` 라고 표시하도록 했습니다.