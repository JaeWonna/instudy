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

    useEffect(() => {
        const fetchGroupUsers = async () => {
            try {
                console.log("async 진입");
                console.log("groupId", groupId);
                const response = await axios.post(`/checking/read/groupUser`, {
                    groupId: groupId,
                });
                console.log("response.data", response.data);
                setGroupUsers(response.data);
                console.log("groupUsers", response.data);
            } catch (error) {
                console.error("Error fetching group users:", error);
            }
        };

        fetchGroupUsers();
    }, [groupId]);

    // console.log("groupUsers[0].userId", groupUsers[0].userId)

    const memberData = [
        { userId: 'user1', img: groupMember },
        { userId: 'user2', img: groupMember2 },
        { userId: 'user3', img: groupMember3 },
        { userId: 'user4', img: groupMember4 },
    ];

    // for (const user of memberData) {
    //     memberData.push(groupUsers.userId);
    // }
    //
    // console.log("memberData", memberData)

    return (
        <div>
            {/*<ul>*/}
            {/*    {memberData.map((member, index) => (*/}
            {/*        <img*/}
            {/*            key={index}*/}
            {/*            src={member.img}*/}
            {/*            alt={`Image ${index + 1}`}*/}
            {/*            className="img-fluid rounded-circle border border-dark border-3"*/}
            {/*            style={imgStyle}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</ul>*/}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {memberData.map((member) => {
                    // console.log("member.userId", member.userId)
                    // console.log("user.userId", user.userId)
                    // const member = memberData.find((member) => member.userId === user.userId);
                    // console.log("member", member)
                    // const img = member && member.img;
                    //
                    // console.log("img", img)
                    return (
                        <div key={member.id} style={{ margin: '0 30px' }}>
                            <img src={member.img} alt={`User ${member.userId}`} style={imgStyle} class="img-fluid rounded-circle border border-dark border-3"/>
                            <Typography>{member.userId}</Typography>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GroupUserList;
