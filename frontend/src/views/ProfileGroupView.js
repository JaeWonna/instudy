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

    // const groups = ["그룹1", "그룹2", "그룹3"]

    // const groupList = groups.map((group) => (<ProfileGroupCard group={group} />))

    //   console.log(groups.username)
    //   console.log(group)

    // const dataList = [
    //   { id: 1, groupName: "Group 1", link: "https://example.com/1" },
    //   { id: 2, groupName: "Group 2", link: "https://example.com/2" },
    //   { id: 3, groupName: "Group 3", link: "https://example.com/3" }
    // ];

    const groups = [
      { id: 1, name: '그룹1', path: '/group/1' },
      { id: 2, name: '그룹2', path: '/group/2' },
      { id: 3, name: '그룹3', path: '/group/3' }
    ];

    return (
        <div>
            <Container>
      <Row>
      </Row>
      <Row>
      <Col sm>
        {/* {groupList} */}
        {/* {
          groups.map(group => (
            <ProfileGroupCard key={group.id}>
              <div>{group.id}</div>
              <div>{group.groupName}</div>
            </ProfileGroupCard>
            // handleGroupCard={handleGroupCard} 
          ))
        } */}
        {/* <div>
    {dataList.map(data => (
      <ProfileGroupCard key={data.id} data={data}>

        <div>{data.id}</div>
        <div>{data.groupName}</div>
        <a href={data.link}>Link</a>

      </ProfileGroupCard>
    ))}
  </div> */}

{groups.map(group => (
  <ProfileGroupCard key={group.id} name={group.name} path={group.path} />
))}
      </Col>
      </Row>
    </Container>
        </div>
    );
};

export default ProfileGroupView;