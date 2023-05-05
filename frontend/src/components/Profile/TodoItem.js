import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

const TodoItem = ({ todo, onDelete }) => {
    const { id, study_status, todo_text} = todo;

    const finishedClick = () => {
        console.log("상태상태는" + todo.studyStatus)
        //현재 상태가
            //status 수정
            axios.post("/todo/updateStatus", {
                todo_text : todo_text,
            }).then((response) => {

        })
            //status 수정
            axios.post("/todo/updateStatus", {
                todo_text : todo_text,
            }).then((response) => {

            })
    }

    return (
            <tbody>
            <tr>
                <th scope="row"></th>
                <td>{todo.todo_text}</td>
                <td>{todo.studyStatus}</td>
                <td>
                    <button className="btn btn-danger" onClick={()=>{onDelete(todo.todo_text)}}>Delete</button>
                    <button type="submit" className="btn btn-success ms-1" onClick={finishedClick}>Finished</button>
                </td>
            </tr>
            </tbody>
    );
};

export default TodoItem;
