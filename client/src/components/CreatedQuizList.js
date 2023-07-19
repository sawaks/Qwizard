import React from 'react'
import titleIcon from "../images/magic-wand.png";
// import quizImg from "../images/quizImg.png";
import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { REMOVE_QUESTION } from '../utils/mutations';

const CreatedQuizList = ({ userData }) => {
    const [deleteQuestion] = useMutation(REMOVE_QUESTION);

    const handleDeleteQuestion = async (questionId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            await deleteQuestion({
                variables: { questionId },
            });
        } catch (err) {
            console.error(err);
        }
    }

    if (!userData.length) {
        return (
            <div className="createdQuizList-Container">
                <div className="title-conatiner title-created-conatiner">
                    <h2>Your Created Quiz</h2>
                    <div className="icon-container icon-created-container"><img src={titleIcon} /></div>
                </div>
                <h3>Not Created Quiz Yet</h3>
            </div>)
    }
    return (
        <div className="createdQuizList-Container">
            <div className="title-conatiner title-created-conatiner">
                <h2>Your Created Quiz</h2>
                <div className="icon-container icon-created-container"><img src={titleIcon} /></div>
            </div>
            {userData &&
                userData.map((userData) => (
                    <Row key={userData.createdQuizzes._id} justify="space-between" className="createdQuizCard-container">
                        <Col xs={24} sm={24} md={10} lg={10} xl={10} className="createdImg-container">
                            <img src={userData.createdQuizzes.imageURL} />
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={14} xl={14} className="createdQuizText-container">
                            <h4>{userData.createdQuizzes.title}</h4>
                            <p>{userData.createdQuizzes.description}</p>
                            <Button as={Link} to="/" type="primary" style={{ backgroundColor: "#FD5F00", border: "solid 1px #FD5F00" }} shape="round" >Update</Button>
                            <Button as={Link} to="/" type="primary" style={{ backgroundColor: "#05004E", border: "solid 1px #05004E" }} shape="round" >Leaderboard</Button>
                            <Button type="primary" danger shape="round" onClick={() => handleDeleteQuestion(userData.createdQuizzes._Id)}>Delete</Button>
                        </Col>
                    </Row>
                ))}

        </div>
    )
}

export default CreatedQuizList