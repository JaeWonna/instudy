import { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import '../group/GroupCreateModal.css';
import {Autocomplete, Box, Checkbox, FormHelperText, InputLabel, MenuItem, TextField, Typography, Button} from "@mui/material";
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

const GroupCreateModal = (props) => {
  const closeModal = () => {
    props.setModalOpen(false);
  }

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const handleInputChange1 = (e) => {
      setGroupName(e.target.value);
  }

  const handleInputChange2 = (e) => {
      setDescription(e.target.value);
  }

    const [selectedSkillTags, setSelectedSkillTags] = useState([]);

    const currencies = [
        {
            value: '1',
            label: '1',
        },
        {
            value: '2',
            label: '2',
        },
        {
            value: '3',
            label: '3',
        },
        {
            value: '4',
            label: '4',
        },
        {
            value: '5',
            label: '5',
        },
    ];

    const createGroup = (event) => {
        const formData = new FormData();
        formData.append("groupName", groupName);
        formData.append("description", description);

        axios.all([
            axios.post('/group/new', {
                groupName: "그룹 이름",
                description: "그룹 설명",
                manager: "유저 아이디",
                capacity: "3",
                groupStack: ["ss", "tt", "aa", "cc", "kk"],
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
    };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [groupFilterModalOpen, setGroupFilterModalOpen] = useState(false);

    const [groups, setGroups] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const filterGroup = (filteredGroups) => {
        setGroups(filteredGroups);
        setGroupFilterModalOpen(false);
        setLoading(false);
    }


    // 필터링을 초기화했기 때문에 다시 전체 데이터를 받아오기 위한 메소드
    const resetGroups = () => {
        axios.get("/groups/getGroups").then((response) => {
            setGroups(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>     
<div class="row">
        <div class="col-md-12 col-lg-6"></div>

        <div class="d-flex justify-content-end align-items-end">

<Button onClick={() => setGroupFilterModalOpen(true)}>
<FontAwesomeIcon icon={faSearch} />
</Button>

</div>
        </div>

            <ModalStaticBackdrop
                keepMounted
                width="sm"
                open={groupFilterModalOpen}
                component={<GroupFilterModal filterGroup={filterGroup} resetGroups={resetGroups} setOpen={setGroupFilterModalOpen} />}
            />

        <div class="row">
        <div class="col-md-12 col-lg-6"></div>

        <div class="d-flex justify-content-end align-items-end">

<div className="rounded-icon">
<button style={null} data-mdb-toggle="modal" data-mdb-target="#exampleModal">
<FontAwesomeIcon icon={faPlus} />
</button>
</div>

</div>
        </div>

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
                      value={groupName}
                      onChange={handleInputChange1}
                  />

                  <TextField
                      id="outlined-multiline-static"
                      label="그룹 설명"
                      multiline
                      rows={4}
                      defaultValue="Default Value"
                      value={description}
                      onChange={handleInputChange2}
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
              <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="1"
              >
                  {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          {option.label}
                      </MenuItem>
                  ))}
              </TextField>
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