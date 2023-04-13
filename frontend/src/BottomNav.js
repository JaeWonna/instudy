import React, { useState } from 'react';
// 사용할 아이콘 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';


import './css/BottomNav.css';

const BottomNav = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const [activeNav, setActiveNav] = useState(1);

    return (
      <>
<nav class="navbar fixed-bottom">
  
  <div className="container row" style={{ display: 'flex', justifyContent: 'center' }}>


    <div class="card" style={{ margin: '20px', width: '80%' }}>
  <div class="card-body">

    <Container>
      <Row>

  <Col>
  <a class="navbar-brand" href="/" onClick={() => setActiveNav(1)}>
        <FontAwesomeIcon icon={faHome} className={activeNav === 1 ? "nav-item active" : "nav-item"} />
        </a>
        </Col>

        <Col>
        <a class="navbar-brand" href="/group" onClick={() => setActiveNav(2)}>
        <FontAwesomeIcon icon={faUsers} className={activeNav === 2 ? "nav-item active" : "nav-item"} />
        </a>
        </Col>

        <Col>
        <a class="navbar-brand" href="/profile" onClick={() => setActiveNav(3)}>
        <FontAwesomeIcon icon={faAddressCard} className={activeNav === 3 ? "nav-item active" : "nav-item"} />
        </a>
        </Col>

        </Row>
        </Container>

    </div>

<style>{`
        @media (max-width: 768px) {
          div {
            flex-direction: column;
            align-items: center;
          }
          Card {
            width: 100%;
          }
        }
      `}</style>

</div>

</div>


</nav>

</>

    );
};

export default BottomNav;