import React from 'react';
// import { useQuery } from '@apollo/client';

import CreatedQuizList from '../components/CreatedQuizList';
import PlayedQuizList from '../components/PlayedQuizList';
import Navbar from '../components/UserPageNavi';
import witch from '../images/witch.png';
import crystalBall from '../images/crystal-ball.png';
import { Col, Row } from 'antd';

import UserPageProvider from '../utils/userPageContext';
// import { GET_ME } from '../utils/queries';

import { Helmet } from 'react-helmet-async';



const Userpage = () => {
    // const { loading, data } = useQuery(GET_ME);
    // console.log(data)
    // const userData = data?.me.createdQuizzes || {};
    // const userData2 = data?.me.playedQuizzes || {};


    return (
        <div className="userPage-container">
            <Helmet>
                <title>Qwizard | My Quizzies</title>
                <meta name="description" content="This is the user page. You can see the Lists about created quizzes and played quizzes." />
            </Helmet>
            <Navbar
                leftLinkTo='/createQuiz'
                rightLinkTo='/'
                leftTitle='Create a Quiz!'
                rightTitle='Play a Quiz!'
                rightSrc={crystalBall}
                leftSrc={witch}

            />

            <Row justify="space-between" style={{ marginTop: "50px", paddingBottom: "100px" }}>
                <UserPageProvider>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>

                        <CreatedQuizList />

                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>

                        <PlayedQuizList />

                    </Col>
                </UserPageProvider>
            </Row>


        </div>
    )
}

export default Userpage