import { Typography, Box, Container } from '@mui/material';

const CheckTodoItem = (props) => {
    const { todo } = props;
return (
    <>
        <Container maxWidth="xl">
            <Box sx margin={3}>
        <Typography variant="h4">ㅇ {todo.todoText}</Typography>
                <hr />
            </Box>
        </Container>
    </>
)
}

export default CheckTodoItem;