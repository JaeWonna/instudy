import { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import '../group/GroupCreateModal.css';
import {Autocomplete, Box, Checkbox, FormHelperText, InputLabel, MenuItem, TextField, Typography} from "@mui/material";
import { tags } from '../../assets/tag/tags'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import {Input} from "@mui/icons-material";

const GroupCreateModal = (props) => {
  const closeModal = () => {
    props.setModalOpen(false);
  }

  const [group, setGroup] = useState({
      groupName: '',
      description: '',
  });

    const handleChange = (prop) => (event) => {
        setGroup({...group, [prop]: event.target.value});
    }

  const createGroup = () => {
      axios
          .post('/group/new', {
              groupName: group.groupName,
              description: group.description,
              manager: props.manager,
          })
          .then((res) => {

          })
          .catch();
  };

  const [selectedSkillTags, setSelectedSkillTags] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

    return (
        <div>     
<div class="row">
        <div class="col-md-12 col-lg-6"></div>

        <div class="d-flex justify-content-end align-items-end">

<div className="rounded-icon">
<FontAwesomeIcon icon={faSearch} />
</div>

</div>
        </div>

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
                  />

                  <TextField
                      id="outlined-multiline-static"
                      label="그룹 설명"
                      multiline
                      rows={4}
                      defaultValue="Default Value"
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