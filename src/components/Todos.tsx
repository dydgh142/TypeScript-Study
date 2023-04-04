import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";
import { TodosContext } from "../store/todos-context";

//TodosContext에 담긴 데이터를 map으로 돌리는 함수 -> TodoItem으로 이동
const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          //TodoItem에서 클릭되었을 경우 TodosContext의 removeTodo함수 실행
          //bind 메서드는 함수를 호출할때 this 키워드를 특정값으로 지정하고, 함수의 인자중 일부를 미리 지정하여 새로운함수를 생성
          // 첫번재 인자로 null을 전달했으므로, this키워드는 removeTodo 함수내에서 전역객체를 가리킴
          //결론적으로 첫번째 인자로 item.id값이 전달되어 todos-context.tsx에서 removeTodo실행
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
