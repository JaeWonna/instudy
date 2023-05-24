import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';
import groupMember from '../../../img/groupMember.jpg';
import * as mdb from 'mdb-ui-kit';
import { Modal } from 'mdb-ui-kit';
import 'mdb-ui-kit/css/mdb.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';
import GroupAssignCreate from "../../group/assignment/GroupAssignCreate";
import axios from "axios";

const GroupAssignCard = (prop) => {
    const cardStyle = {
        width: '18rem',
    }

    const imgStyle = {
        width: '70px',
    }
    const deleteAssign = () => {
        axios
            .post("/assignment/delete", {assignmentId: prop.assign.assignmentId})
            .then((response) => {
                console.log(response);
                if (response.data === "delete") {
                    alert("과제가 삭제되었습니다");
                } else {
                    alert("과제 삭제 실패");
                }
            })
            .catch((error) => {
                // 서버 요청 실패
                console.error("과제 삭제 실패: ", error);
                // 에러 처리 또는 알림 표시
            });
    };

    const [modal, setModal] = useState(false);

    const [clickedNum, setClickedNum] = useState(0);

    return (
        <div className="card" style={cardStyle} key={prop.idx}
             onClick={() => {
                 setClickedNum(prop.idx);
                 setModal(!modal);
             }
             }>
            <div class="card-body">
                <Link to="/detailedModal" data-mdb-toggle="modal" data-mdb-target="#exampleModal">{prop.assign.title}</Link>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{prop.assign.title}</h5>
                                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <div class="container">
                                    <div class="row">
                                        <div class="col-md">
                                            <b>기간</b>
                                        </div>
                                        <div class="col-md">
                                            {prop.assign.period}
                                        </div>
                                        <div class="col-md">
                                            <b>상세 설명</b>
                                        </div>
                                        <div class="col-md">
                                            {prop.assign.description}
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
                                    <div className="rounded-icon" onClick={deleteAssign}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>

// {modal == true ? <mdModal title={title} clickedNum={clickedNum}/> : null}
//
// <div className="row">
//     <div className="col-md-12 col-lg-6"></div>
//
//     <div className="d-flex justify-content-end align-items-end">
//
//         <GroupAssignCreate groupId={groupId}/>
//
//     </div>
// </div>

    );
}
export default GroupAssignCard;