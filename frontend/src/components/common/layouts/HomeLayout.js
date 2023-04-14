import {Container, Row, Col} from 'react-bootstrap';
import HomeCard from "../../Home/HomeCard";
import React, { useState, useEffect } from "react";
import SignIn from '../../../containers/sign/sign_in/SignIn';
import mainTime from '../../../img/mainTime.jpg';
import mainGrass from '../../../img/mainGrass.png';
import mainGoodJob from '../../../img/mainGoodJob.jpg';

function HomeLayout() {
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
          <h1 class="mb-3"><b>Instudy는</b></h1>
          <h4 class="mb-3">스터디 그룹 관리 및 그룹별 공유 일기 플랫폼입니다</h4>
          <a class="btn btn-outline-light btn-lg" href="#!" role="button">Call to action</a>
        </div>
      </div>
        <div class="card" style={{margin: '20px 0'}}>
  <div class="card-body" style={textStyle}>
    <h5 class="card-title" ><b>무의미한 시간 조작은 No</b></h5>
    <img src={mainTime} alt="Generic placeholder" style={imgStyle} />
    <p class="card-text" style={descStyle}>공부는 양보다 질, 어쩌구</p>
    <hr />
    <h5 class="card-title"><b>잔디 심기로 학습 성취를 얻으세요</b></h5>
    <img src={mainGrass} alt="Generic placeholder" style={imgStyle} />
    <p class="card-text" style={descStyle}>재밌음 어쩌구</p>
<hr />
    <h5 class="card-title"><b>그룹원 간의 상호 '인정'을 통해 객관적인 피드백을 받으세요</b></h5>
    <img src={mainGoodJob} alt="Generic placeholder" style={imgStyle} />
    <p class="card-text" style={descStyle}>실질적이고 능동적인 학습관리 어쩌구</p>
    <hr />
  </div>
</div>
        </div>
        <div class="col-md-3"></div>
</div>






    </div>
  </div>

        {/* <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
        <div class="card">
  <div class="card-body" style={textStyle}>
    <h5 class="card-title" ><b>무의미한 시간 조작은 No</b></h5>
    <img src={mainTime} alt="Generic placeholder" style={imgStyle} />
    <p class="card-text">공부는 양보다 질, 어쩌구</p>

    <h5 class="card-title"><b>잔디 심기로 학습 성취를 얻으세요</b></h5>
    <img src={mainGrass} alt="Generic placeholder" style={imgStyle} />
    <p class="card-text">재밌음 어쩌구</p>

    <h5 class="card-title"><b>그룹원 간의 상호 '인정'을 통해 객관적인 피드백을 받으세요</b></h5>
    <img src={mainGoodJob} alt="Generic placeholder" style={imgStyle} />
    <p class="card-text">실질적이고 능동적인 학습관리 어쩌구</p>

  </div>
</div>
        </div>
        <div class="col-md-3"></div>
</div> */}
        

            {/* <Row>
                    <h2>메뉴</h2>
                <hr/>
                        {
                            menu.map((menu) => (
                                <Col><HomeCard menu={menu}/></Col>
                            ))
                        }

            </Row> */}

            </>
        
    )
}

export default HomeLayout;