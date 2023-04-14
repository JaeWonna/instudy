import {useState, useRef} from "react"
import TodoCreate from '../Profile/TodoCreate'
import TodoList from '../Profile/TodoList'

const Todo = () => {

    const [todos, setTodos] = useState([]);

    //todo_item 생성

    const dataId = useRef(0)
    const onCreate = (todo) => {
        const newItem = {
            text : todo,
            checked: false,
            id : dataId.current,
            //project_id : project_id,
        };
        dataId.current += 1;

        setTodos([...todos, newItem]);
    }

    //todo_item 삭제
    const onDelete = (targetId) => {
        const newTodoList = todos.filter((it) => it.id !== targetId);
        setTodos(newTodoList);
        alert("삭제되었습니다");
    }

    return (
        <>
            <TodoCreate onCreate={onCreate}/>
            <TodoList todos={todos} onDelete = {onDelete}/>
        </>
    )
}

export default Todo;
