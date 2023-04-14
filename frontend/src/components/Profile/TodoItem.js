import React, { useCallback, useState } from "react";

const TodoItem = ({ todo, onDelete }) => {

    return (
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>{todo.text}</td>
                <td>In progress</td>
                <td>
                    <button type="submit" className="btn btn-danger">Delete</button>
                    <button type="submit" className="btn btn-success ms-1">Finished</button>
                </td>
            </tr>
            </tbody>
    );
};

export default TodoItem;
