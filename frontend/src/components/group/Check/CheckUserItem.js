import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import CheckUserDetails from "./CheckUserDetails";

const CheckUserItem = (props) => {
    const { member, setClickedNum, clickedNum, setDetail } = props;

    const imgStyle = {
        width: '70px',
        margin: '10px',
    };

    // const handleClick = () => {
    //     setShowDetails(true);
    // };

    // console.log("member", member)
    // console.log("member.id", member.id)

    return (
        <div key={member.id} style={{ margin: '0 30px' }}>
            <img
                src={member.img}
                alt={`User ${member.userId}`}
                style={imgStyle}
                className="img-fluid rounded-circle border border-dark border-3"
                onClick={() => {
                    setClickedNum(member.id);
                    setDetail(true)
                    console.log("clickedNum", clickedNum)
                }
                }
            />
            <Typography>{member.userId}</Typography>

            {/*{showDetails && <CheckUserDetails memberId={member.id} />}*/}
        </div>
    );
}

export default CheckUserItem;
