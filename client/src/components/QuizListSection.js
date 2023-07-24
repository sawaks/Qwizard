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
                        <div className="col-md-4 card-style-container">
                            <div key={dbQuiz._id} className="card h-100 card-style">
                                <img className="card-img-top quiz-img" src={dbQuiz.imgURL} alt="quiz Img" />
                                <div className="d-flex flex-column card-body">
                                    <h5 className="card-title">{dbQuiz.title}</h5>
                                    <p className="card-text">{dbQuiz.description}</p>
                                    <div className='linkBtn-container mt-auto'>
                                        {Auth.loggedIn() ? (
                                            <>
                                                <Link to={`/Quiz/${dbQuiz._id}`}>
                                                    <Button type="primary" style={{ margin: "5px", width: "100%", background: "#FD5F00", borderColor: "#FD5F00" }} shape="round" >Play</Button>
                                                </Link>
                                                <Link to={`/Leaderboard/${dbQuiz._id}`}>
                                                    <Button type="primary" style={{ margin: "5px", width: "100%", background: "#05004E", borderColor: "#05004E" }} shape="round">See Leaderboard</Button>
                                                </Link>
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