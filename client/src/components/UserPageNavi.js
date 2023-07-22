import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import witch from '../images/witch.png';
import crystalBall from '../images/crystal-ball.png';
import { Button } from 'antd';

const UserPageNavi = () => {
    return (
        <div className="userPageNavi-container">
            <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="creteQuizbtn-wrppaer">
                    <Link to='/' ><Button className="creteQuizbtn-container">
                        Create Your Quiz!
                    </Button ></Link>
                    <div className="witch-container"><img src={witch} style={{ width: "100px" }} alt="witch" /></div >
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="findQuizbtn-wrapper creteQuizbtn-wrppaer">
                    <Link to='/' ><Button className="findQuizbtn-container">
                        Find and Play Quiz!
                    </Button></Link>
                    <div className="crystalBall-container witch-container"><img src={crystalBall} style={{ width: "100px" }} alt="crystal ball" /></div>
                </Col>

            </Row>

        </div>
    )
}

export default UserPageNavi