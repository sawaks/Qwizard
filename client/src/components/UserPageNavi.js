import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
// import witch from '../images/witch.png';
// import crystalBall from '../images/crystal-ball.png';
import { Button } from 'antd';

const UserPageNavi = ({ rightLinkTo, leftLinkTo, rightTitle, leftTitle, rightSrc, leftSrc, }) => {
    return (
        <div className="userPageNavi-container">
            <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="creteQuizbtn-wrppaer">
<<<<<<< HEAD
                    <Link to={leftLinkTo} ><Button className="creteQuizbtn-container">
                        {leftTitle}
=======
                    <Link to='/createQuiz' ><Button className="creteQuizbtn-container">
                        Create a Quiz!
>>>>>>> main
                    </Button ></Link>
                    <div className="witch-container"><img src={leftSrc} style={{ width: "100px" }} alt={leftSrc} /></div >
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="findQuizbtn-wrapper creteQuizbtn-wrppaer">
<<<<<<< HEAD
                    <Link to={rightLinkTo} ><Button className="findQuizbtn-container">
                        {rightTitle}
=======
                    <Link to='/' ><Button className="findQuizbtn-container">
                        Play a Quiz!
>>>>>>> main
                    </Button></Link>
                    <div className="crystalBall-container witch-container"><img src={rightSrc} style={{ width: "100px" }} alt={rightSrc} /></div>
                </Col>

            </Row>

        </div>
    )
}

export default UserPageNavi