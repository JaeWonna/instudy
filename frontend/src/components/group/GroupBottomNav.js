import {Link, useParams} from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function GroupBottomNav() {
  const [value, setValue] = React.useState(0);

  const {id} = useParams();
  const params = useParams(); //url로 넘어온 파라미터를 받는 역할 (App.js 의 :id 참고)
  const groupId = params.id; //(params의 :id를 받는 역할)
  console.log("groupId ", groupId)
      
      return (
          <Box sx={{ width: 500 }}>
            <BottomNavigation
                style={{
                  position: 'fixed',
                  bottom: 0,
                  width: '100%',
                }}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
            >
              <BottomNavigationAction
                  label="과제"
                  icon={<PeopleIcon />}
                  component={Link}
                  to="/"
              />

              <BottomNavigationAction
                  label="인증"
                  icon={<AccountBoxIcon />}
                  component={Link}
                  to={`/todo/${groupId}`}
              />

              <BottomNavigationAction
                  label="캘린더"
                  icon={<AccountBoxIcon />}
                  component={Link}
                  to="/profile"
              />

              <BottomNavigationAction
                  label="타이머"
                  icon={<AccountBoxIcon />}
                  component={Link}
                  to={`/timer/${groupId}`}
              />

              <BottomNavigationAction
                  label="피드"
                  icon={<AccountBoxIcon />}
                  component={Link}
                  to={`/feed/${groupId}`}
              />

            </BottomNavigation>
          </Box>
      );
};