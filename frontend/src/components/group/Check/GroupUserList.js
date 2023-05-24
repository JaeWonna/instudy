import { useEffect, useState } from "react";
import axios from "axios";

const GroupUserList = (props) => {
    const [groupUsers, setGroupUsers] = useState([]);
    let groupId = '123'; // 그룹 ID를 적절한 값으로 설정해야 합니다.

    const { loginUser } = props;

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
                console.log("groupUsers", groupUsers)
            } catch (error) {
                console.error("Error fetching group users:", error);
            }
        };

        fetchGroupUsers();
    }, [groupId]);

    return (
        <div>
            <h1>Group Users</h1>
            <ul>
                {groupUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default GroupUserList;
