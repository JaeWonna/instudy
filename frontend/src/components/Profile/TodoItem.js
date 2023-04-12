
const TodoItem = ({ todo, onDelete }) => {
    return (
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Buy groceries for next week</td>
                <td>In progress</td>
                <td>
                    <button type="submit" className="btn btn-danger">Delete</button>
                    <button type="submit" className="btn btn-success ms-1">Finished</button>
                </td>
            </tr>
            <tr>
                <th scope="row">1</th>
                <td>Buy groceries for next week</td>
                <td>In progress</td>
                <td>
                    <button type="submit" className="btn btn-danger">Delete</button>
                    <button type="submit" className="btn btn-success ms-1">Finished</button>
                </td>
            </tr>
            <tr>
                <th scope="row">1</th>
                <td>Buy groceries for next week</td>
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
