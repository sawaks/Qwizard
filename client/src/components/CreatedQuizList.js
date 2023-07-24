import React from 'react'
import titleIcon from "../images/magic-wand3.png";
// import quizImg from "../images/quizImg.png";
import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { REMOVE_QUIZ } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const CreatedQuizList = ({ userData }) => {
    // const [removeQuiz] = useMutation(REMOVE_QUIZ);

    const [removeQuiz] = useMutation(REMOVE_QUIZ, {
        update(cache, { data: { removeQuiz } }) {
            try {
                cache.writeQuery({
                    query: GET_ME,
                    data: { me: removeQuiz },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleDeleteQuestion = async (quizId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            await removeQuiz({
                variables: { quizId },
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
                <div className="icon-container icon-created-container">
                    <img src={titleIcon} alt="magic wand" />
                </div>
            </div>
            {userData &&
                userData.map((userData) => (
                    <Row key={userData._id} justify="space-between" className="createdQuizCard-container">
                        <Col xs={24} sm={24} md={10} lg={10} xl={10} className="createdImg-container">
                            <img src={userData.imgURL} alt="quiz" />
                            {/* <div style={{ width: "100px", backgroundImage: `url(${userData.imgURL})` }}></div> */}
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={14} xl={14} className="createdQuizText-container">
                            <h4>{userData.title}</h4>
                            <p>{userData.description}</p>
                            <Link to={`/editQuiz/${userData._id}`}>
                                <Button type="primary" style={{ backgroundColor: "#FD5F00", border: "solid 1px #FD5F00" }} shape="round" >Update</Button>
                            </Link>
                            <Link to={`/Leaderboard/${userData._id}`}>
                                <Button type="primary" style={{ backgroundColor: "#05004E", border: "solid 1px #05004E" }} shape="round" >Leaderboard</Button>
                            </Link>
                            <Link to="/">
                                <Button type="primary" danger shape="round" onClick={() => handleDeleteQuestion(userData._id)}>Delete</Button>

                            </Link>
                        </Col>
                    </Row>
                ))}

        </div>
    )
}

export default CreatedQuizList