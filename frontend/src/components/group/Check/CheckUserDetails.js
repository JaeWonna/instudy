import {Box, Typography, Button, TextField, Autocomplete, Checkbox, InputLabel, Select, MenuItem} from "@mui/material";
import {MDBCard, MDBCardBody} from "mdb-react-ui-kit";
import GroupUserList from "./GroupUserList";
import * as React from "react";
import CheckTodoList from "./CheckTodoList";
import CheckCard from "./CheckCard";
import CheckProgress from "./CheckProgress";
import {useState, useEffect} from "react";
import axios from "axios";
import MemoView from "./Comment/MemoView";
import CheckCreate from "./CheckCreate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import ModalStaticBackdrop from "../../common/modal/ModalStaticBackdrop";
import GroupFilterModal from "../finder/GroupFilterModal";
import CheckModal from "./CheckModal";
import {tags} from "../../../assets/tag/tags";
import FormControl from "@mui/material/FormControl";

const CheckUserDetails = (props) => {
    const {clickedNum, todos, loginUser, groupId} = props;

    // console.log("todos", todos);

    const handleButtonClick = () => {
        // Handle button click logic here
    };

    const [goodCount, setGoodCount] = useState(0);
    const [badCount, setBadCount] = useState(0);

    const totalCount = goodCount - badCount;

    console.log("groupId", groupId)

    const [checkingId, setCheckingId] = useState(0);

    const createChecking = async () => {
        try {
            const response = await axios.post("/checking/create", {
                userId: loginUser.userId,
                groupId: groupId, // replace with your groupId
                content: "This is a content",
            });
            const newChecking = response.data;
            console.log("Created Checking:", newChecking);
            return newChecking.checkingId; // Return the checkingId
        } catch (error) {
            console.error("Error:", error);
            // Handle error case
        }
    };

    useEffect(() => {
        const fetchCheckingId = async () => {
            const newCheckingId = await createChecking();
            setCheckingId(newCheckingId);
        };

        fetchCheckingId();
    }, []);

    useEffect(() => {
        createChecking();
    }, []);

    const handleCreateChecking = () => {
        createChecking();
    };

    console.log("여기서 checkingId", checkingId)


    return (
        <>
            <MDBCard className="mb-5">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="10vh"
                >
                    <Typography variant="h5" gutterBottom>
                        유저{clickedNum} 인증 페이지
                    </Typography>
                </Box>
                <MDBCardBody>
                    <CheckTodoList todos={todos}/>
                    <MemoView loginUser={loginUser}

                        // checkingId={checkingId}
                    />
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="10vh"
                    >
                        <Button
                            style={null}
                            data-mdb-toggle="modal"
                            data-mdb-target="#exampleModal"
                            onClick={handleCreateChecking}
                        >
                            인증하기
                        </Button>


                    </Box>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <Typography variant='h5' my={1}>인증하기</Typography>
                                    <button type="button" class="btn-close" data-mdb-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': {m: 1, width: '90%'},
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >

                                        <CheckCreate groupId={groupId} loginUser={loginUser}
                                                     setCheckingId={setCheckingId} checkingId={checkingId}/>


                                    </Box>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </MDBCardBody>
            </MDBCard>
        </>
    );
};

export default CheckUserDetails;