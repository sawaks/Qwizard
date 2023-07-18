import React from 'react';
import CreatedQuizList from '../components/CreatedQuizList';
import PlayedQuizList from '../components/PlayedQuizList';
import Navbar from '../components/UserPageNavi';
import { Col, Row } from 'antd';


const Userpage = () => {
    return (
        <div className="userPage-container">
            <Navbar />
            <Row>
                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    <CreatedQuizList />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <PlayedQuizList />
                </Col>

            </Row>

        </div>
    )
}

export default Userpage