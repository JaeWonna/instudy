import TodoItem from '../Profile/TodoItem'
import { useState } from "react";

const TodoList = ({todos, onDelete}) => {

    return (
        <div className={TodoList}>
            <div className="card-body p-4">
                <table className="table mb-4">
                    <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Todo item</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>

                    {todos.map((todo) => (
                        <TodoItem todo ={todo} key = {todo.id} onDelete={onDelete}/>
                    ))}

                </table>

            </div>
        </div>
    )
}

export default TodoList