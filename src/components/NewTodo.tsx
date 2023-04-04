import { useRef, useContext } from "react";
import classes from "./NewTodo.module.css";
import { TodosContext } from "../store/todos-context";

// 모든 TS에서 ? 는 값이 확실치는 않지만 일단 접근해서 값을 가져와바라 하는 뜻
// null이 오는 경우에는 상수나 null을 집어넣음
// !는 null이 아님을 확실히 아니까 무조건 접근해서 언제나 실제 값을 가져올 수 있도록 할때 사용

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;
    //물음표는 레퍼런스에 값이 설정되지 않았을수도 있기때문에 붙음 (사용하려는시점에)
    //todoTextInputRef에 값이 있으면? string으로 없으면? undefined로
    //결론: 물음표가 붙는이유는 TS가 실제 value를 가져올수있는지 알아야할 필요가 없다는 뜻
    //값이 있다는것을 확신한다면 ! 로 바꿀수 있음.
    //!로 하면 enteredText에 string만 표시가됨.

    if (enteredText?.trim().length === 0) {
      //trhow an error
      return;
    }

    todosCtx.addTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
