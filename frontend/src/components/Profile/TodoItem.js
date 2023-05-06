import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

const TodoItem = ({ todo, onDelete }) => {
    const { id, study_status, todoText} = todo;

    const finishedClick = () => {
        console.log("상태상태는" + todo.studyStatus)
        //현재 상태가
            //status 수정
            axios.post("/todo/updateStatus", {
                todoText : todoText,
            }).then((response) => {

        })
            //status 수정
            axios.post("/todo/updateStatus", {
                todoText : todoText,
            }).then((response) => {

            })
    }

    return (
            <tbody>
            <tr>
                <th scope="row"></th>
                <td>{todo.todoText}</td>
                <td>{todo.studyStatus}</td>
                <td>
                    <button className="btn btn-danger" onClick={()=>{onDelete(todo.todoText)}}>Delete</button>
                    <button type="submit" className="btn btn-success ms-1" onClick={finishedClick}>Finished</button>
                </td>
            </tr>
            </tbody>
    );
};

export default TodoItem;
