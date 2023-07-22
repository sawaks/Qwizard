import React from 'react';
// import { Col, Row } from 'antd';
import titleIcon from "../images/witch-hat2.png";
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const QuizListSection = ({ dbQuizzes, title }) => {
    if (!dbQuizzes.length) {
        return (
            <div className="quizList-container">
                <div className="title-conatiner">
                    <h2>{title}</h2>
                    <div className="icon-container">
                        <img src={titleIcon} style={{ width: "35px", marginTop: "2px" }} alt="witch hat" />
                    </div>
                </div>
                <h4>No Quiz Yet</h4>
            </div>
        )
    }
    return (
        <div className="quizList-container">
            <div className="title-conatiner">
                <h2>{title}</h2>
                <div className="icon-container"><img src={titleIcon} style={{ width: "35px", marginTop: "2px" }} alt="witch hat" /></div>
            </div>
            <div className="row quizCards-container">
                {dbQuizzes &&
                    dbQuizzes.map((dbQuiz) => (
                        <div className="col-md-4">
                            <div key={dbQuiz._id} className="card card-style">
                                <img className="card-img-top quiz-img" src={dbQuiz.imageURL} alt="quiz Img" />
                                <div className="card-body">
                                    <h5 className="card-title">{dbQuiz.title}</h5>
                                    <p className="card-text">{dbQuiz.description}</p>
                                    <div className='linkBtn-container'>
                                        {Auth.loggedIn() ? (
                                            <>
                                                <Button as={Link} to='/' type="primary" style={{ margin: "5px", width: "200px", background: "#FD5F00", borderColor: "#FD5F00" }} shape="round" >Play</Button>
                                                <Button as={Link} to='/' type="primary" style={{ margin: "5px", width: "200px", background: "#05004E", borderColor: "#05004E" }} shape="round">See Leaderboard</Button>
                                            </>

                                        ) : (
                                            <p>Please login or signup..., and play quiz! </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))

                }


            </div>
        </div>
    )
}

export default QuizListSection