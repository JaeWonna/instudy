import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import groupMember from '../../../img/groupMember.jpg';
import groupMember2 from '../../../img/groupMember2.JPG';
import groupMember3 from '../../../img/groupMember3.png';
import groupMember4 from '../../../img/groupMember4.jpg';

const GroupUserList = (props) => {
    const [groupUsers, setGroupUsers] = useState([]);

    const { groupId } = props;

    const imgStyle = {
        width: '70px',
        margin: '10px',
    };

    const memberImg = [
        groupMember,
        groupMember2,
        groupMember3,
        groupMember4,
        // groupMember5,
    ];

    useEffect(() => {
        const fetchGroupUsers = async () => {
            try {
                console.log("async 진입")
                console.log("groupId", groupId)
                const response = await axios.post(`/checking/read/${groupId}/groupUser`, {
                    groupId: groupId,
                });
                console.log("response.data", response.data)
                setGroupUsers(response.data);
                console.log("groupUsers", response.data)
            } catch (error) {
                console.error("Error fetching group users:", error);
            }
        };

        fetchGroupUsers();
    }, [groupId]);

    return (
        <div>
            <ul>
                {memberImg.map((memberImg, index) => (
                    <img key={index} src={memberImg} alt={`Image ${index + 1}`} className="img-fluid rounded-circle border border-dark border-3" style={imgStyle} />
                ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {groupUsers.map((user) => (
                    <div key={user.id} style={{ margin: '0 30px' }}>
                        <Typography>{user.user_name}</Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupUserList;
