import {Container, Row, Col} from 'react-bootstrap';
import HomeCard from "../../Home/HomeCard";
import React, { useState, useEffect } from "react";
import SignIn from '../../../containers/sign/sign_in/SignIn';
import mainTime from '../../../img/mainTime.jpg';
import mainGrass from '../../../img/mainGrass.png';
import mainGoodJob from '../../../img/mainGoodJob.jpg';

import mainBackGround from '../../../img/mainBackGround.png';
import mainPic1 from '../../../img/mainPic1.png';
import mainPic2 from '../../../img/mainPic2.png';
import mainPic3 from '../../../img/mainPic3.png';
import mainBluePic1 from '../../../img/mainBluePic1.png';
import mainBluePic2 from '../../../img/mainBluePic2.png';
import mainBluePic3 from '../../../img/mainBluePic3.png';


function DesktopMain() {
    const [menu, setMenu] = useState([]);

    useEffect(()=> {
        const menudata = [
            {title: "그룹", link: "/group"},
            {title: "프로필", link: "/profile"}
        ];

        setMenu([...menudata]);

        console.log(menu);
    }, []);

    const textStyle = {
        textAlign: 'center'
    }

    const imgStyle = {
        width: '400px',
    }

    const backgroundStyle = {
        backgroundImage: `url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')`,
        height: '2000px'
    }

    const maskStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }

    const descStyle = {
        margin: '50px 0'
    }

    return (
        <>
            <div class="p-5 text-center bg-image" style={backgroundStyle}>
                <div class="mask" style={maskStyle}>
                    <div class="row">
                        <div class="col-md-3"></div>
                        <div class="col-md-6">
                            <div class="d-flex justify-content-center align-items-center" style={{margin: '20px 0'}}>
                                <div class="text-white">
                                    <h1 class="mb-3"><b>Instudy 에서 함께 공부해요!</b></h1>
                                    <h4 class="mb-3"></h4>
                                    <a class="btn btn-outline-light btn-lg" href="#!" role="button">Call to action</a>
                                </div>
                            </div>
                            <div class="card" style={{margin: '20px 0'}}>
                                <div class="card-body" style={textStyle}>
                                    <h5 class="card-title" ><b>Instudy! 공식 인스타그램 OPEN!
                                    </b></h5>
                                    <img src={mainPic1} alt="Generic placeholder" style={imgStyle} />
                                    <p class="card-text" style={descStyle}>지금 팔로우하고 다양한 소식을 만나보세요👋</p>
                                    <hr />
                                    <h5 class="card-title"><b>스터디를 찾는 가장 쉬운 방법
                                    </b></h5>
                                    <img src={mainPic2} alt="Generic placeholder" style={imgStyle} />
                                    <p class="card-text" style={descStyle}>Instudy에서 함께할 팀원을 찾으세요🔍 </p>
                                    <hr />
                                    <h5 class="card-title"><b>Instudy!는 여러분들의 스터디를 도와줍니다
                                    </b></h5>
                                    <img src={mainPic3} alt="Generic placeholder" style={imgStyle} />
                                    <p class="card-text" style={descStyle}>Instudy에서 꿈과 목표를 이루세요🙏</p>
                                    <hr />
                                    <h5 className="card-title"><b>👀Instudy! 이런 사람들에게 필요해요
                                    </b></h5>
                                    <p className="card-text" style={descStyle}>✅새로운 스터디를 시작해보고 싶으신 분</p>
                                    <p className="card-text" style={descStyle}>✅발걸음을 같이 맞춰 나갈 스터디원을 찾고 계신 분</p>
                                    <p className="card-text" style={descStyle}>✅공부에 대한 의무감 대신 성취감을 얻고 싶으신 분</p>

                                    <hr/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3"></div>
                    </div>






                </div>
            </div>

        </>

    )
}

export default DesktopMain;