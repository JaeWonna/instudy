import {useState, useRef, useEffect} from "react"
import TodoCreate from '../Profile/TodoCreate'
import TodoList from '../Profile/TodoList'
import {useParams} from "react-router-dom";
import axios from "axios";

const Todo = () => {

    let group_id;

    const [todos, setTodos] = useState([]);

    //데이터 불러오기
    useEffect(() => {
        axios
            .post("/todo/read", {
    
            })
            .then((response) => {
                setTodos(response.data);
            })
            .catch();
    }, []);

/*    //group_id 가져오기
    axios.post("", {
        group_id : group_id
    }).then()*/

    //todo_item 생성
    const dataId = useRef(0)
    const onCreate = (todo) => {
        const newItem = {
            text : todo,
            status : "READY",
            /*group_id : group_id,*/
            id : dataId.current,
        };
        dataId.current += 1;

        //데이터 저장
        axios.post("/todo", {
            todo_text : newItem.text,
            study_status : newItem.status
            /*group_id : newItem.group_id*/
        }).then((response) => {
            // console.log(response)
        })

        //데이터 불러오기
        axios.post("/todo/read", {

        }).then((response) =>{
            setTodos(response.data);
        })

        // setTodos([...todos, newItem]);
    }


    //todo_item 삭제
    const onDelete = (text) => {
        // const newTodoList = todos.filter((it) => it.id !== targetId);
        // setTodos(newTodoList);
        // alert("삭제되었습니다");
        axios.post("/todo/delete", {
            todo_text : text,
        }).then((response) =>{
        //데이터 불러오기
            axios.post("/todo/read", {

            }).then((response) =>{
                setTodos(response.data);
            })
        })
    }

    return (
        <>
            <TodoCreate onCreate={onCreate}/>
            <TodoList todos={todos} onDelete={onDelete}/>
        </>
    )
}

export default Todo;
