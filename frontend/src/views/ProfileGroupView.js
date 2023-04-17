import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProfileGroupCard from '../components/Profile/ProfileGroupCard';

const ProfileGroupView = () => {
    // const groups = [
    //     {
    //       id: 1,
    //       groupName: '그룹1',
    //       link: '/group/1'
    //     },
    //     {
    //       id: 2,
    //       groupName: '그룹2',
    //       link: '/group/2'
    //     },
    //     {
    //       id: 3,
    //       groupName: '그룹3',
    //       link: '/group/3'
    //     }
    //   ];

    const groups = ["그룹1", "그룹2", "그룹3"]

    const groupList = groups.map((group) => (<ProfileGroupCard group={group} />))

      console.log(groups.username)

    return (
        <div>
            <Container>
      <Row>
      </Row>
      <Row>
      <Col sm>
        {groupList}
      </Col>
      </Row>
    </Container>
        </div>
    );
};

export default ProfileGroupView;