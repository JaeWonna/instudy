import { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import '../group/GroupCreateModal.css';
import {Autocomplete, Box, Checkbox, FormHelperText, InputLabel, MenuItem, TextField, Typography, Button, Select } from "@mui/material";
import { tags } from '../../assets/tag/tags'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import {Input} from "@mui/icons-material";
import ModalStaticBackdrop from "../../components/common/modal/ModalStaticBackdrop"
import GroupFilterModal from "./finder/GroupFilterModal";
import {SelectChangeEvent} from "@mui/material/Select";

const GroupCreateModal = (props) => {
    const { loginUser } = props;
    console.log("manager", props.manager)

    const closeModal = () => {
        props.setModalOpen(false);
    }

    const [group, setGroup] = useState({
        groupName: '',
        description: '',
        capacity: 0,
    })

    const handleInput = (state) => {
        console.log(state)
        setGroup({
            ...group,
            [state.target.id]: state.target.value
        })
    }

    const [selectedSkillTags, setSelectedSkillTags] = useState([]);

    const [capacity, setCapacity] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        console.log("여기까지 왓남")
        setCapacity(event.target.value);
        console.log("capacity", capacity)
    };

    const createGroup = (event) => {
        const newGroupData = {
            ...group,
            groupStack: selectedSkillTags.map((s) => s.value),
            // member: [{
            //     user_id: loginUser.user_id,
            //     user_name: loginUser.user_name,
            // }],
            manager: props.manager,
            capacity: capacity,
        }
        console.log("newGroupData", newGroupData)

        axios
            .post("/group/new", newGroupData)
            .then((response) => {
                const responseData = response.data; // 서버 응답 데이터
                if (responseData === true) {
                    // 그룹 생성 성공
                    alert("그룹 생성 완료");
                    // 추가적인 동작 수행 가능
                } else {
                    // 그룹 생성 실패
                    alert("그룹 생성 실패");
                    // 추가적인 동작 수행 가능
                }
            })
            .catch((error) => {
                // 서버 요청 실패
                console.error("그룹 생성 요청 실패: ", error);
                // 에러 처리 또는 알림 표시
            });
    };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [groupFilterModalOpen, setGroupFilterModalOpen] = useState(false);

    const [isLoading, setLoading] = useState(true);

    const filterGroup = (filteredGroups) => {
        setGroup(filteredGroups);
        setGroupFilterModalOpen(false);
        setLoading(false);
    }


    // 필터링을 초기화했기 때문에 다시 전체 데이터를 받아오기 위한 메소드
    const resetGroups = () => {
        axios.get("/groups/getGroups").then((response) => {
            setGroup(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <div className="rounded-icon">
                <Button onClick={() => setGroupFilterModalOpen(true)}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </div>
            <div className="rounded-icon">
                <Button style={null} data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>


            <ModalStaticBackdrop
                keepMounted
                width="sm"
                open={groupFilterModalOpen}
                component={<GroupFilterModal filterGroup={filterGroup} resetGroups={resetGroups} setOpen={setGroupFilterModalOpen} />}
            />

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <Typography variant='h5' my={1}>그룹 생성하기</Typography>
                            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

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
                                        label="그룹 이름"
                                        multiline
                                        maxRows={4}
                                        value={group.groupName}
                                        id="groupName"
                                        onChange={handleInput}
                                    />

                                    <TextField
                                        id="outlined-multiline-static"
                                        label="그룹 설명"
                                        multiline
                                        rows={4}
                                        defaultValue="Default Value"
                                        value={group.description}
                                        id="description"
                                        onChange={handleInput}
                                    />
                                </div>

                                <b>공부 종류 키워드(projectStack)</b>
                                <Autocomplete
                                    multiple
                                    options={tags.tech}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.label}
                                    value={selectedSkillTags}
                                    onChange={(event, newValue) => {
                                        setSelectedSkillTags(newValue);
                                    }}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.label}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="이 그룹에서 공부하려는 것은..." placeholder="키워드" />
                                    )}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">인원</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={capacity}
                                        label="인원"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => createGroup()}>그룹 생성</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupCreateModal;