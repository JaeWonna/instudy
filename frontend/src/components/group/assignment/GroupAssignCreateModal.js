import {Modal, Paper, Box, Typography, Button, TextField, Autocomplete, Checkbox, MenuItem} from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import {tags} from "../../../assets/tag/tags";
import {useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  background-color: white;
  padding: ${({ theme }) => theme.spacing(2)};
`;

// const useStyles = makeStyles((theme) => ({
//     modal: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     paper: {
//         backgroundColor: 'white',
//         padding: theme.spacing(2),
//     },
//     closeButton: {
//         marginLeft: 'auto',
//     },
// }));

function GroupAssignCreateModal({ open, onClose }) {
    // const classes = useStyles();

    const [assignName, setAssignName] = useState("");
    const [description, setDescription] = useState("");

    const handleInputChange1 = (e) => {
        setAssignName(e.target.value);
    }

    const handleInputChange2 = (e) => {
        setDescription(e.target.value);
    }

    const params = useParams();
    const group_id = params.id;

    const createAssign = (event) => {
        const formData = new FormData();
        formData.append("assignName", assignName);
        formData.append("description", description);

        axios.all([
            axios.post('/group/new', {
                group_id: group_id,
                assignName: "그룹 이름",
                description: "그룹 설명",
            }),
            // axios.post("/group/new", formData),
            // axios.post("/group/new", selectedSkillTags),
            // axios.post("/group/new", currencies)
        ])
            .then(axios.spread((res1, res2, res3) => {
                // console.log(res1.data);
                // console.log(res2.data);
                // console.log(res3.data);
            }))
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <StyledModal open={open} onClose={onClose}>
            <StyledPaper>
                <Box>
                    <Typography variant='h5' my={1}>과제 생성하기</Typography>
                    {/*<Button className={classes.closeButton} onClick={onClose}>*/}
                    {/*    닫기*/}
                    {/*</Button>*/}
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '90%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="과제 이름"
                                multiline
                                maxRows={4}
                                // value={groupName}
                                // onChange={handleInputChange1}
                            />

                            <TextField
                                id="outlined-multiline-static"
                                label="과제 설명"
                                multiline
                                rows={4}
                                defaultValue="Default Value"
                                // value={description}
                                // onChange={handleInputChange2}
                            />
                        </div>
                    </Box>
                </Box>
                <Button onClick={() => createAssign()}>과제 생성</Button>
            </StyledPaper>
        </StyledModal>
    );
}

export default GroupAssignCreateModal;