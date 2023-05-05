import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

const TodoItem = ({ todo, onDelete }) => {
    const { todo_id, study_status, todo_text} = todo;

    const finishedClick = () => {
        console.log("상태상태는" + study_status)
        //현재 상태가
        if(todo.study_status === 'READY') {
            todo.study_status = 'FINISH';

            //status 수정
            axios.post("todo/", {
                study_status : todo.study_status,
            }).then((response) => {

        })
        }else if(todo.study_status === 'FINISH') {
            todo.study_status = 'READY';

            //status 수정
            axios.post("todo/", {
                study_status : todo.study_status,
            }).then((response) => {

            })
        }
    }

    return (
            <tbody>
            <tr>
                <th scope="row"></th>
                <td>{todo.todo_text}</td>
                <td>{todo.study_status}</td>
                <td>
                    <button className="btn btn-danger" onClick={()=>{onDelete(todo.todo_text)}}>Delete</button>
                    <button type="submit" className="btn btn-success ms-1" onClick={finishedClick}>Finished</button>
                </td>
            </tr>
            </tbody>
    );
};

export default TodoItem;
