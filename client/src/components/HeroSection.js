import React, { useState } from 'react';
import star from '../images/newStar.png';
import txt from '../images/heroTxt.png';
import heroWitch from '../images/hero-witch1.png';
import magicWand from '../images/magic-wand2.png';
import crystalBall from '../images/crystal-ball2.png';
import singupWand from '../images/signup.png';
import sword from "../images/sword.png";
import witchHat from "../images/witch-hat2.png";
import majicSpell from "../images/magic-spell.png";
import { Col, Row, Button } from 'antd';
import CustomModal from './CustomModal';


const HeroSection = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="hero-container">
            <Row justify="space-between">
                <Col className="left-hero" xs={24} sm={24} md={12} lg={12} xl={12}>
                    <img src={star} alt="star" />
                    <div className="heroTxt-container">
                        <img src={txt} style={{ width: "90%" }} alt="hero title" />
                    </div>
                    <Row>
                        <Col className="wichies-container">
                            {/* <img src={heroWitch} alt="witch" /> */}
                        </Col>
                        <Col className="hero-button-contaienr">
                            <Button onClick={() => setShowModal(true)} className="hero-button" shape="round">Create and Play Quiz! </Button>
                        </Col>
                    </Row>


                </Col>
                <Col className="right-hero" xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className="hero-txt-big-container">
                        <h3>Sign up and <br /> join the fun!</h3>
                        <div className="hero-icon-big-container">
                            <img src={singupWand} style={{ width: "40px", marginTop: "5px" }} alt="wand for sign up" />
                        </div>

                    </div>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="hero-txt-sml-container">
                            <h4>Play<br />Quizzes</h4>
                            <div className="hero-icon-sml-container">
                                <img src={majicSpell} style={{ width: "35px", marginTop: "5px" }} alt="magic spell" />
                            </div>

                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="hero-txt-sml-container">
                            <h4>Create<br />Quizzes</h4>
                            <div className="hero-icon-sml-container">
                                <img src={magicWand} style={{ width: "35px", marginTop: "5px" }} alt="magic wand" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="hero-txt-sml-container">
                            <h4>Challenge <br />your friends!</h4>
                            <div className="hero-icon-sml-container">
                                <img src={sword} style={{ width: "35px", marginTop: "5px" }} alt="sword" />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="hero-txt-sml-container">
                            <h4 className="sml-right-txt">View the<br />leaderboards!</h4>
                            <div className="hero-icon-sml-container">
                                <img src={crystalBall} style={{ width: "35px", marginTop: "5px" }} alt="crystal ball" />
                            </div>
                        </Col>
                    </Row>
                    <div className="hero-txt-big-container">
                        <h3>Become a<br />Quiz Addict</h3>
                        <div className="hero-icon-big-container">
                            <img src={witchHat} style={{ width: "40px", marginTop: "5px" }} alt="witch hat" />
                        </div>
                    </div>
                    <div className="star-container">
                        <img src={star} alt="star" />
                    </div>
                </Col>

            </Row>
            <CustomModal showModal={showModal} setShowModal={setShowModal} />


        </div>
    )
}

export default HeroSection;