import React, { useState } from "react";
import Todo from "../models/todo";

//타입지정
type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

//TodosContextObj 타입의 Context를 생성함. 내부 객체의 타입들은 다음과 같음
//해당 TodosContext는 컴포넌트트리 내에서 전역으로 사용되어야 하기 때문에 export 해줌

//전역으로 넘어온 데이터 요청에
//Todos.tsx같은경우는 removeTodo(item.id) 값을 요청함
export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

//ex) Todos.tsx에서와같이 useContext를 이용한 전역상태에서 값이 넘어온 경우
//해당 값을 props로 받아와 작업을 처리
const TodosContextProvider: React.FC = (props) => {
  //Todo는 id와 text 가 string 타입으로 있는 데이터 모델
  //해당 타입이 배열형태로 있는 todos를 사용해 데이터를 저장하고 상태관리함
  const [todos, setTodos] = useState<Todo[]>([]);

  //222222222 데이터 추가 핸들러 string 값의 todoText를 받아와
  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    //concat 함수를 이용해 새로운 데이터를 todos배열에 추가함
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  //333333333 Id 값을 받아와 제거하는 함수
  const removeTodoHandler = (todoId: string) => {
    //인자로 넘어온 id값과 일치하지 않는 것은 그대로 남겨둠
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  //TodosContextObj타입의 객체를 생성, 해당 객체를 value로 넘겨줌
  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler, //222222222
    removeTodo: removeTodoHandler, //333333333
  };

  return (
    //TodosContext라는 React Context객체를 생성하고 value값을 props로 넘겨줌
    <TodosContext.Provider value={contextValue}>
      {/* {console.log(props.children)} */}
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
