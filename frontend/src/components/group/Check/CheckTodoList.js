import CheckTodoItem from "./CheckTodoItem";
import { Typography, Box, Container } from '@mui/material';

const CheckTodoList = (props) => {
    const { todos } = props;
    // Destructuring the `props` object to extract the `todos` property

    return (
        <>
            <Container maxWidth="xl">
                <Box sx>
                <Typography variant="h3">Todo List</Typography>
                {todos.map((todo, index) => (
                    <CheckTodoItem
                        todo={todo}
                        key={index}
                    />
                ))}
                    </Box>
            </Container>
        </>
    );
}

export default CheckTodoList
