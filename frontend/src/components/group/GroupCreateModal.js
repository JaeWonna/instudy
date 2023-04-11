import { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import '../group/GroupCreateModal.css';
// import { Autocomplete, Checkbox, TextField } from "@mui/material";
// import { tags } from '../../assets/tag/tags'
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

const GroupCreateModal = (props) => {
  const closeModal = () => {
    props.setModalOpen(false);
  }

  const [selectedSkillTags, setSelectedSkillTags] = useState([]);

  // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  // const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <div>    
          <h1>그룹 생성 모달 컴포넌트입니다</h1>   

          <button type="button" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
  Launch demo modal
</button>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">그룹 생성하기</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

      <form>
      <Container>
        <Row>
        <div class="form-outline mb-4">
    <input type="text" id="form4Example1" class="form-control" />
    <label class="form-label" for="form4Example1">그룹 이름(groupName)</label>
  </div>
  </Row>
        <Row>
          <div class="form-outline mb-4">
    <textarea class="form-control" id="form4Example3" rows="4"></textarea>
    <label class="form-label" for="form4Example3">그룹 설명(description)</label>
  </div>
          </Row>
        <Row>
          <b>공부 종류 키워드(projectStack)</b>
          {/* <Autocomplete
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
                                    <TextField {...params} label="이 프로젝트에서 사용하는 기술은..." placeholder="기술" />
                                )}
                            /> */}
          </Row>
        <Row>
          <b>그룹 정원(capacity)</b>
          <div class="col-12">
    <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
    <select class="select">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
    </select>
  </div>
          </Row>
        </Container>

        </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default GroupCreateModal;