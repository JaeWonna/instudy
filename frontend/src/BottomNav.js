import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faAddressCard } from '@fortawesome/free-solid-svg-icons';

function BottomNav() {
  const textStyle = {
    writingMode: 'horizontal-tb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', 
  }

  const NavStyle = {
    padding: '0 50px'
  }
  
  return (

    <Navbar fixed="bottom">
      

      <Nav className="mx-auto">

        <Nav.Link href="/" style={NavStyle}>
        <FontAwesomeIcon icon={faHome} />
        <Row style={textStyle}><span>홈</span></Row>
          </Nav.Link>

            <Nav.Link href="/group" style={NavStyle}>
        <FontAwesomeIcon icon={faUsers} />
        <Row style={textStyle}><span>그룹</span></Row>
          </Nav.Link>


            <Nav.Link href="/profile" style={NavStyle}>
        <FontAwesomeIcon icon={faAddressCard} />
        <Row style={textStyle}><span>프로필</span></Row>
          </Nav.Link>


      </Nav>   
      
    </Navbar>

  );
}

export default BottomNav;