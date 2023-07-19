import React from 'react';
import { useQuery } from '@apollo/client';

import CreatedQuizList from '../components/CreatedQuizList';
import PlayedQuizList from '../components/PlayedQuizList';
import Navbar from '../components/UserPageNavi';
import { Col, Row } from 'antd';

import { GET_ME } from '../utils/queries';


const Userpage = () => {
    const { loading, data } = useQuery(GET_ME);
    console.log(data)
    const userData = data?.me || {};


    return (
        <div className="userPage-container">
            <Navbar />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Row justify="space-between">
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <CreatedQuizList userData={userData} />
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <PlayedQuizList userData={userData} />
                    </Col>
                </Row>
            )}


        </div>
    )
}

export default Userpage