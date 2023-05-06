import React, {useRef, useState} from "react";
import { TextField } from "@mui/material";

const TodoCreate = ({ onCreate }) => {
    const todoInput = useRef();
    const [inputData, setInputData] = useState([]);

    const onCheckEnter = (e) => {
        if (e.key === "Enter") {
            if (e.target.value.length < 1) {
                todoInput.current.focus();
                return;
            }
            console.log(e.target.value);
            onCreate(e.target.value);
            todoInput.current.value ="";
        }
    };

    const onClickButton = () => {
        console.log(inputData);
        onCreate(inputData);
        todoInput.current.value ="";
    }

    const handleChange = (e) => {
        setInputData(e.target.value)
    }

    return (
        <>
            <div className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                <div className="col-10">
                    <TextField
                        focused
                        fullWidth
                        label="할 일 추가"
                        id="outlined-size-small"
                        defaultValue=""
                        size="small"
                        inputRef={todoInput}
                        onKeyPress={onCheckEnter}
                        setInputData={todoInput}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-2 p-0">
                    <button type="button" className="btn btn-primary" onClick={onClickButton}>Save</button>
                </div>
            </div>
        </>
    );
};

export default TodoCreate;