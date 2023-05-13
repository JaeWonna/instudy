import { Autocomplete, Box, Checkbox, DialogContent, DialogTitle, IconButton, MenuItem, Stack, TextField, Typography, Button } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { options } from '../../../assets/tag/Tech'
import { useRef, useState } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import * as API from '../../../api/API';
import { tags } from '../../../assets/tag/tags';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const GroupFilterModal = (props) => {
    const [selected, setSelected] = useState([]);
    const [filterData, setFilterData] = useState({
        group_name: "",
        manager: "",
    })
    const inputTN = useRef();
    const inputPN = useRef();
    const inputMID = useRef();

    const [selectedProjectTags, setSelectedProjectTags] = useState([]);
    const [selectedSkillTags, setSelectedSkillTags] = useState([]);
    const [selectedRoleTags, setSelectedRoleTags] = useState([]);

    const filter = async () => {
        const newfilterData = {
            group_name: inputTN.current.value,
            manager: inputPN.current.value,
        }

        setFilterData(newfilterData)
        console.log("filtereData:", filterData)
        const response = await API.groupFilter(newfilterData);
        console.log("response: ", response)
        props.filterGroup(response);
    }

    return (
        <>
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
                    // width:"100%"
                }}
            >
                <DialogTitle id="scroll-dialog-title">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h3">
                            검색하기
                        </Typography>
                        <IconButton size="large" onClick={() => props.setOpen(false)}><ClearIcon fontSize="inherit" /></IconButton >
                    </Box>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <Stack spacing={2}>
                        <TextField label="팀명" inputRef={inputTN} defaultValue={filterData.group_name} />
                        <TextField label="팀장명" inputRef={inputPN} defaultValue={filterData.manager} />

                    </Stack>
                </DialogContent>
                {/* <DialogActions> */}
                <Button
                    color="success"
                    onClick={() => filter()}
                    fullWidth
                >
                    위 조건으로 검색하기
                </Button>
                {/* </DialogActions> */}
            </Box>
        </>
    )
}

export default GroupFilterModal;