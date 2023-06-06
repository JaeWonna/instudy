import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCheckSquare, faCalendar, faClock, faRss } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import { useParams } from "react-router-dom";

const GroupBottomNav = () => {
    const textStyle = {
        writingMode: 'horizontal-tb',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    const NavStyle = {
        padding: '0 20px',
    };

    const RowStyle = styled.div`
        writing-mode: horizontal-tb;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `;

    const { groupId } = useParams();

    return (
        <Navbar fixed="bottom">
                        <Nav className="mx-auto">

                            <Nav.Link href={`/group/${groupId}`} style={NavStyle}>
                                <FontAwesomeIcon icon={faBookOpen} />
                                <RowStyle style={textStyle}>
                                    <span>과제</span>
                                </RowStyle>
                            </Nav.Link>

                            <Nav.Link href={`/check/${groupId}`} style={NavStyle}>
                                <FontAwesomeIcon icon={faCheckSquare} />
                                <RowStyle style={textStyle}>
                                    <span>인증</span>
                                </RowStyle>
                            </Nav.Link>

                            <Nav.Link href="/profile" style={NavStyle} groupId={groupId}>
                                <FontAwesomeIcon icon={faCalendar} />
                                <RowStyle>
                                    {/* style={textStyle} */}
                                    <span>캘린더</span>
                                </RowStyle>
                            </Nav.Link>

                            <Nav.Link href={`/timer/${groupId}`} style={NavStyle}>
                                <FontAwesomeIcon icon={faClock} />
                                <RowStyle style={textStyle}>
                                    <span>타이머</span>
                                </RowStyle>
                            </Nav.Link>

                            <Nav.Link href={`/feed/${groupId}`} style={NavStyle}>
                                <FontAwesomeIcon icon={faRss} />
                                <RowStyle style={textStyle}>
                                    <span>피드</span>
                                </RowStyle>
                            </Nav.Link>
                        </Nav>
        </Navbar>
    );
};

export default GroupBottomNav;
