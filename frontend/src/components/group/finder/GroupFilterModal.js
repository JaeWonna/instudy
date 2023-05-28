import { Box, DialogContent, DialogTitle, IconButton, TextField, Typography, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
import axios from "axios";

const GroupFilterModal = (props) => {
    const [filterData, setFilterData] = useState({
        group_name: "",
        manager: "",
    });

    const { setSearchResult } = props;

    const searchGroup = async () => {
        try {
            const response = await axios.post('/groups/search', {
                groupName: filterData.group_name, // 검색할 그룹 이름
            });
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error occurred while searching for groups', error);
        }
    };

    const filter = async () => {
        await searchGroup();
        props.setOpen(false); // 모달 창 닫기
    };

    return (
        <div>
            <Box
                sx={{
                    p: {
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 5,
                        xxl: 6
                    },
                }}
            >
                <DialogTitle id="scroll-dialog-title">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h3">
                            검색하기
                        </Typography>
                        <IconButton size="large" onClick={() => props.setOpen(false)}>
                            <ClearIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <TextField
                        label="팀명"
                        value={filterData.group_name}
                        onChange={(e) => setFilterData({ ...filterData, group_name: e.target.value })}
                    />
                    <TextField
                        label="팀장명"
                        value={filterData.manager}
                        onChange={(e) => setFilterData({ ...filterData, manager: e.target.value })}
                    />
                </DialogContent>
                <Button
                    color="success"
                    onClick={filter}
                    fullWidth
                >
                    위 조건으로 검색하기
                </Button>
                {/*/!* 검색 결과를 사용하여 렌더링 *!/*/}
                {/*{searchResult.map((group) => (*/}
                {/*    <div key={group.groupId}>{group.groupName}</div>*/}
                {/*))}*/}
            </Box>
        </div>
    );
};

export default GroupFilterModal;
