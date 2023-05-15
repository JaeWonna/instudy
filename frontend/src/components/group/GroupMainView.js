import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';
import groupMember from '../../img/groupMember.jpg'; 
import * as mdb from 'mdb-ui-kit';
import { Modal } from 'mdb-ui-kit';
import 'mdb-ui-kit/css/mdb.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';

const GroupMainView = (props) => {
    const {id} = useParams();

    const imgStyle = {
        width: '70px',
    }

    const [title, setTitle] = useState([
        '1과목 끝내기',
        '2과목 끝내기',
        '3과목 끝내기'
    ])

    const [modal, setModal] = useState(false);

    const [clickedNum, setClickedNum] = useState(0);

    const cardStyle = {
        width: '18rem',
    }

    const params = useParams(); //url로 넘어온 파라미터를 받는 역할 (App.js 의 :id 참고)
    const group_id = params.id; //(params의 :id를 받는 역할)

    useEffect( () => {
        getAndSetGroup(group_id);
    }, [group_id]);

    const getAndSetGroup = (group_id) => {

    }

    console.log(1)

    console.log(setClickedNum)
    console.log(setModal)

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                 그룹{id}
            </Typography>
            {
                title.map((content, idx) => 
                <div class="card" style={ cardStyle } key={idx} 
                onClick={ ()=>{
                    setClickedNum(idx);
                    setModal(!modal);
                }
                }>
                    <div class="card-body">
                        <Link to="/detailedModal" data-mdb-toggle="modal" data-mdb-target="#exampleModal">{content}</Link>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{content}</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

      <div class="container">
<div class="row">
    <div class="col-md">
    <b>기간</b>
    </div>
    <div class="col-md">
    하드코딩
    </div>
    <div class="col-md">
    <b>상세 설명</b>
    </div>
    <div class="col-md">
    하드코딩
    </div>
  </div>
        
<hr />
<div class="row">
  <div class="col-4"><button type="button" class="btn btn-success">완료</button></div>
  <div class="col-4">              <div class="flex-shrink-0">
                  <img src={groupMember} alt="Generic placeholder" class="img-fluid rounded-circle border border-dark border-3" style={imgStyle} />

              </div></div>

</div>
<div class="row">
  <div class="col-4"><button type="button" class="btn btn-warning">진행중</button></div>

</div>
<div class="row">
  <div class="col-4"><button type="button" class="btn btn-danger">시작전</button></div>

</div>
        </div>

      </div>
      <div class="modal-footer">
      <div class="flex-shrink-0">
      <div className="rounded-icon">
      <FontAwesomeIcon icon={faPen} />
      </div>

              </div>
              <div class="flex-shrink-0">
              <div className="rounded-icon">
              <FontAwesomeIcon icon={faTrash} />
              </div>

              </div>
      </div>
    </div>
  </div>
</div>
                        </div>



                        
                        </div>
                )
            }

{modal == true ? <mdModal title={title} clickedNum={clickedNum}/> : null}


        </div>
    );
};

export default GroupMainView;