import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import {useEffect, useState} from "react";
import axios from "axios";

export default function CheckTodoList (props) {
    const {clickedNum} = props;

    const [todos, setTodos] = useState([]);

    const [checked, setChecked] = React.useState([0]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.post("/checking/read/todo", {
                    userId: clickedNum
                });
                const todoData = response.data;
                setTodos(todoData);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };

        fetchTodos();
    }, [clickedNum]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todos.map((todo) => {
                const labelId = `checkbox-list-label-${todo}`;

                return (
                    <ListItem
                        key={todo.todoId}
                        secondaryAction={
                            <IconButton edge="end" aria-label="comments">
                                <CommentIcon />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(todo)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={todo.studyStatus === "FINISH"}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />

                            </ListItemIcon>
                            <ListItemText id={todo.todoId} primary={todo.todoText} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}