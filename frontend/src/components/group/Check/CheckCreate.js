import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from "axios";
import Button from '@mui/material/Button';
import {Box} from "@material-ui/core";

const CheckCreate = (props) => {
    const { setCreateCheck, groupId, loginUser, setCheckingId, checkingId, readCheckingData } = props;

    const sendCreateRequest = async () => {
        const url = '/checking/create';

        const createData = {
            userId: loginUser.userId,
            groupId: groupId,
            content: 'This is a content.',
        };

        try {
            const response = await axios.post(url, createData);
            const checking = response.data;
            console.log('check create에서 Checking:', checking);
            setCheckingId(checking.checkingId);
            // 요청 성공 후 처리할 작업 수행
        } catch (error) {
            if (error.response) {
                // 서버 응답이 왔지만 응답 상태 코드가 에러인 경우
                console.error('Error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                // 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 오류 등)
                console.error('Error:', error.request);
            } else {
                // 요청 설정을 준비하는 동안 발생한 오류
                console.error('Error:', error.message);
            }
            // 요청 실패 시 처리할 작업 수행
        }
    };

    const createCheck = async () => {
        try {
            // 함수 호출
            await sendCreateRequest();
            console.log("checkingId", checkingId)
            // setCheckingId(readCheckingData.checkingId);
            // 요청 성공 후 처리할 작업 수행
        } catch (error) {
            console.error('Error:', error);
            // 요청 실패 시 처리할 작업 수행
        }
    };

    // console.log("create 누르고 checkingId", checkingId)

    return (
        <>

            <Stack direction="row" spacing={1}>
                <Button color="secondary" variant="contained" onClick={() => {
                    setCreateCheck(true);
                    createCheck();
                    // setCheckingId(readCheckingData.)
                }
                }
                >
                    인증하기
                </Button>
            </Stack>

        </>
        );
};

export default CheckCreate;