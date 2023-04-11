import { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import { forms } from 'mdb-ui-kit';
import '../group/GroupCreateModal.scss'

const GroupCreateModal = (props) => {
  const closeModal = () => {
    props.setModalOpen(false);
  }

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
          <b>그룹 이름(groupName)</b>
        <div class="form-outline mb-4">
    <input type="text" id="form4Example1" class="form-control" />
    <label class="form-label" for="form4Example1">Name</label>
  </div>
  </Row>
        <Row>
          <b>그룹 설명(description)</b>
          <div class="form-outline mb-4">
    <textarea class="form-control" id="form4Example3" rows="4"></textarea>
    <label class="form-label" for="form4Example3">Message</label>
  </div>
          </Row>
        <Row>
          <b>공부 종류 키워드(projectStack)</b>
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