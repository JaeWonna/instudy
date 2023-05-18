import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCheckSquare, faCalendar, faClock, faRss } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

const GroupBottomNav = () => {
    const textStyle = {
        writingMode: 'horizontal-tb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', 
      }
    
      const NavStyle = {
        padding: '0 50px'
      }

  const Row = styled.div`
  writing-mode: horizontal-tb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
      
      return (
    
        <Navbar fixed="bottom">
          
    
          <Nav className="mx-auto">
    
            <Nav.Link href="/" style={NavStyle}>
            <FontAwesomeIcon icon={faBookOpen} />
            <Row style={textStyle}>
              <span>과제</span>
            </Row>
              </Nav.Link>
    
                <Nav.Link href="/group" style={NavStyle}>
            <FontAwesomeIcon icon={faCheckSquare} />
            <Row style={textStyle}><span>Todo</span></Row>
              </Nav.Link>
    
    
                <Nav.Link href="/profile" style={NavStyle}>
            <FontAwesomeIcon icon={faCalendar} />
            <Row style={textStyle}><span>캘린더</span></Row>
              </Nav.Link>

              <Nav.Link href="/timer" style={NavStyle}>
            <FontAwesomeIcon icon={faClock} />
            <Row style={textStyle}><span>타이머</span></Row>
              </Nav.Link>

              <Nav.Link href="/feed" style={NavStyle}>
            <FontAwesomeIcon icon={faRss} />
            <Row style={textStyle}><span>피드</span></Row>
              </Nav.Link>
    
    
          </Nav>   
          
        </Navbar>
    
      );
};

export default GroupBottomNav;