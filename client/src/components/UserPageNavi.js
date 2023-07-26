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
                    <Link to={leftLinkTo} ><Button className="creteQuizbtn-container">
                        {leftTitle}
                    </Button ></Link>
                    <div className="witch-container"><img className="naviIcon animation" src={leftSrc} style={{ width: "100px" }} alt={leftSrc} /></div >
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="findQuizbtn-wrapper creteQuizbtn-wrppaer">
                    <Link to={rightLinkTo} ><Button className="findQuizbtn-container">
                        {rightTitle}
                    </Button></Link>
                    <div className="crystalBall-container witch-container"><img className="naviIcon animation" src={rightSrc} style={{ width: "100px" }} alt={rightSrc} /></div>
                </Col>

            </Row>

        </div>
    )
}

export default UserPageNavi