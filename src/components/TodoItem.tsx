import classes from "./TodoItem.module.css";

//각 아이템을 나타내는 함수 (map으로 돌려진 개별 아이템)
const TodoItem: React.FC<{
  text: string;
  onRemoveTodo: () => void;
}> = (props) => {
  return (
    //해당 아이템 (li)를 클릭하면 onRemoveTodo (반환값이 없는 함수 실행 -> 다시 Todos.tsx로)
    <li className={classes.item} onClick={props.onRemoveTodo}>
      {props.text}
    </li>
  );
};

export default TodoItem;
