import {useState, useRef, useEffect} from "react"
import TodoCreate from '../Profile/TodoCreate'
import TodoList from '../Profile/TodoList'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const Todo = () => {

    let group_id;

    const [todos, setTodos] = useState([]);
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();

    const onClickModify = () => {
        navigate("/profileModify");
    };

    //데이터 불러오기
    useEffect(() => {
        const storedUser = sessionStorage.getItem("loginUser");
        console.log("test");
        console.log(storedUser);
        if (storedUser) { // 세션에 로그인한 유저가 저장되었을 때
            const parsedUser = JSON.parse(storedUser).data;
            setLoginUser(parsedUser);
        } else { // 세션에 저장된 유저가 null일 때 로그인 페이지로 이동
            navigate("/signIn");
        }

        axios
            .post("/todo/read", {
                userId : loginUser.userId
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
            todoText : newItem.text,
            study_status : newItem.status,
            userId : loginUser.userId
            /*group_id : newItem.group_id*/
        }).then((response) => {
            // console.log(response)
            //데이터 불러오기
            axios.post("/todo/read", {

            }).then((response) =>{
                setTodos(response.data);
            })
        })

        // setTodos([...todos, newItem]);
    }


    //todoText 삭제
    const onDelete = (text) => {
        // const newTodoList = todos.filter((it) => it.id !== targetId);
        // setTodos(newTodoList);
        // alert("삭제되었습니다");
        console.log(text)
        axios.post("/todo/delete", {
            todoText : text,
        }).then((response) =>{
        //데이터 불러오기
            axios.post("/todo/read", {

            }).then((response) =>{
                setTodos(response.data);
            })
        })
    }

    //상태 수정
    const finishedClick = (todo) => {
        console.log("상태상태는" + todo.studyStatus)
        //status 수정
        axios.post("/todo/updateStatus", {
            todoText : todo.todoText,
        }).then((response) => {
            axios.post("/todo/read", {

            }).then((response) =>{
                setTodos(response.data);
            })
        })
    }

    return (
        <>
            <TodoCreate onCreate={onCreate}/>
            <TodoList todos={todos} onDelete={onDelete} finishedClick={finishedClick}/>
        </>
    )
}

export default Todo;
