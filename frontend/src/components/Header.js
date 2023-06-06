import React, {useState, createContext, useContext, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Nav, Navbar, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHome } from '@fortawesome/free-solid-svg-icons';
import '../css/Header.css'
import axios from "axios";

const Header = (props) => {
    const [loginUser, setLoginUser] = useState('');

    const {groupId} = props;

    const onClickLogout = () => {
        sessionStorage.clear()
        alert("로그아웃 성공")
        window.location.reload();
    }

    useEffect(() => {

        const storedUser = sessionStorage.getItem("loginUser");
        setLoginUser(storedUser);
        if (storedUser) { // 세션에 로그인한 유저가 저장되었을 때
           props.setIsLoggedIn(true)
        } else { // 세션에 저장된 유저가 null일 때 로그인 페이지로 이동
            props.setIsLoggedIn(false)
        }
    }, [loginUser]);

    const [group, setGroup] = useState([]);

    useEffect(() => {
        axios
            .post("/groups", {
                loginUser: loginUser,
            })
            .then((res) => {
                setGroup(res.data);
            })
            .catch((error) => {
                console.error("에러 발생:", error);
            });
    }, []);

    const textStyle = {
        marginTop: '0px',
    }

    const MyContext = props.MyContext;

    // const { isLoggedIn } = props.isLoggedIn;

    const GroupHeader = () => {
        const { groupId } = useParams();
        const selectedGroup = group.find((group) => group.groupId == groupId);

        return (
            <>
                <div className="headerText">
                    {selectedGroup ? selectedGroup.groupName : ''}
                </div>
            </>
        );
    };

    return (
        <>

        <header>

  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
    <div class="container-fluid">
    <div className="TextBox">
                        <div style={{display: 'flex'}}>

                        <div class="col-3">
                            <Link to="/">
                            <FontAwesomeIcon icon={faHome}  />
                            </Link>
                        </div>

{/* <div class="col-">
                        <Routes>
                       <Route path="/" element={<MainHeader/>}/>
            <Route path="/group" element={<GroupHeader/>}/>
            <Route path="/profile" element={<ProfileHeader/>}/>
            </Routes>
            </div> */}

                        </div>
           </div>
           <div class="row">
           <Routes>
               <Route path="/main" element={<div className="headerText">메인 페이지</div>}/>
            <Route path="/group" element={<div className="headerText">그룹 페이지</div>}/>
            <Route path="/profile" element={<div className="headerText">프로필 페이지</div>}/>

               <Route path="/group/:groupId" element={<GroupHeader />} />
               <Route path="/feed/:groupId" element={<GroupHeader />}/>
               <Route path="/timer/:groupId" element={<GroupHeader />}/>
               <Route path="/check/:groupId" element={<GroupHeader />}/>
               <Route path="/check/:groupId/:checkingId" element={<GroupHeader />}/>
            </Routes>
           </div>
           <div class="row">
           <div class="col-9">

           {props.isLoggedIn ?
               (
               <button type="button" class="btn btn-dark" onClick={onClickLogout}>logout</button>

               )
               :
               (
               <Link to="/signIn">
                {/*<button type="button" class="btn btn-dark" onClick={() => props.setIsLoggedIn(true)}>login</button>*/}
                    <button type="button" className="btn btn-dark">login</button>
               </Link>
                )
           }


           </div>
           <div class="col-3"><FontAwesomeIcon icon={faBell} /></div>
           </div>
    </div>
  </nav>

  <div class="p-3 text-center" style={textStyle}>
    <h1 class="mb-3"><br/></h1>
  </div>
</header>

        </>
    );
};

export default Header;

