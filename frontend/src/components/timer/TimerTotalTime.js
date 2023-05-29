import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";

const TimerTotalTime = (props) => {
    const { loginUser } = props;

    const [userTotalTime, setUserTotalTime] = useState(0);

    useEffect(() => {
        console.log("여기서 userId", loginUser.userId);

        if (loginUser.userId) { // Check if loginUser.userId is defined
            axios.post('/timer/read', {
                userId: loginUser.userId,
            })
                .then((response) => {
                    console.log("타이머 읽어옴 response", response);

                    if (response.status === 200) {
                        const totalTime = response.data;
                        console.log("User total time:", totalTime);
                        setUserTotalTime(totalTime); // Update the state with the user total time
                    } else {
                        console.log("타이머 읽어오기 실패");
                    }
                })
                .catch((error) => {
                    // Server request failed
                    console.error("서버 요청 타이머 읽어옴 실패: ", error);
                    // Handle error or display notification
                });
        }

    }, [loginUser.userId]);


    return (
        <h1 className="text-center my-3 pb-3">
            {loginUser.userStudyHours} : {loginUser.userStudyMinutes} : {loginUser.userStudySeconds}
        </h1>
    )
}

export default TimerTotalTime;