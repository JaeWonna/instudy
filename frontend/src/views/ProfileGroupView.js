import {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileGroupCard from '../components/Profile/ProfileGroupCard';
import axios from "axios";
import {Grid} from "@mui/material";
import * as React from "react";

const ProfileGroupView = (props) => {
    const { loginUser } = props;

    const [onGroups, setOnGroups] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleGroupCard = (group) => {
        // alert(JSON.stringify(group))
        // if (window.confirm(`${group.project_name}으로 이동하시겠습니까?`)) {
        //     dispatch(selectedGroup(group));
        //     navigate(`/workspace/${group._id}`);
        // }
        setSelectedGroup(group);
    };

    console.log("onGroups: ", onGroups)

    useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                const response = await axios.post('/groups/getMyGroups', {
                    userId: loginUser.userId.toString()
                });
                const userGroups = response.data;
                console.log(userGroups);
                setOnGroups(userGroups);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserGroups();
    }, [loginUser.userId]);


    return (
        <div>
            <Container>
      <Row>
      </Row>
      <Row>
      <Col sm>
{/*{*/}
{/*    groups.map(group => (*/}
{/*  <ProfileGroupCard key={group.id} name={group.name} path={group.path} />*/}
{/*))*/}
{/*}*/}

          {
              onGroups.map((group) => (
                  <Grid item xs={12} xl={6}>
                      <ProfileGroupCard
                          key={group.group_id}
                          group={group}
                          handleGroupCard={handleGroupCard}
                      />
                  </Grid>
              ))
          }
      </Col>
      </Row>
    </Container>
        </div>
    );
};

export default ProfileGroupView;