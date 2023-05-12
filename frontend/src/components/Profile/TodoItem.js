import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

const TodoItem = ({ todo, onDelete, finishedClick={finishedClick}}) => {
    // const { todo_id, todo_text, studyStatus} = todo;
    console.log(JSON.stringify(todo))

    return (
            <tbody>
            <tr>
                <th scope="row"></th>
                <td>{todo.todoText}</td>
                <td>{todo.studyStatus}</td>
                <td>
                    <button className="btn btn-danger" onClick={()=>{onDelete(todo.todoText)}}>Delete</button>
                    <button type="submit" className="btn btn-success ms-1" onClick={()=>{finishedClick(todo)}}>Finished</button>
                </td>
            </tr>
            </tbody>
    );
};

export default TodoItem;
