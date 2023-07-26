import React from 'react';
// import { Col, Row } from 'antd';
import titleIcon from "../images/witch-hat2.png";
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import DesignedTitle from './DesignedTitle';

import Auth from '../utils/auth';

const QuizListSection = ({ dbQuizzes }) => {
    if (!dbQuizzes.length) {
        return (
            <div className="quizList-container">
                <DesignedTitle title="Quiz List" src={titleIcon} />
                <h4>No Quiz Yet</h4>
            </div>
        )
    }
    return (
        <div className="quizList-container">
            <DesignedTitle title="Quiz List" src={titleIcon} />
            <div className="row quizCards-container">
                {dbQuizzes &&
                    dbQuizzes.map((dbQuiz) => (
                        <div key={dbQuiz._id} className="col-md-4 card-style-container">
                            <div key={dbQuiz._id} className="card h-100 card-style">
                                <img className="card-img-top quiz-img" src={dbQuiz.imgURL} alt="quiz Img" />
                                <div className="d-flex flex-column card-body">
                                    <h5 className="card-title">{dbQuiz.title}</h5>
                                    <p className="card-text">{dbQuiz.description}</p>
                                    <h6 className="card-text" style={{ textAlign: 'center' }}>Created by {dbQuiz.quizAuthor}</h6>
                                    <div className='linkBtn-container mt-auto'>
                                        {Auth.loggedIn() ? (
                                            <>
                                                {dbQuiz.leaderboard.find(player => player.player === Auth.getProfile().data.username) ?
                                                    (<Link to={`/Quiz/${dbQuiz._id}`}>
                                                        <Button type="primary"
                                                            style={{ margin: "5px", width: "100%", background: "#FD5F00", borderColor: "#FD5F00" }}
                                                            shape="round" >
                                                            Replay
                                                        </Button>
                                                    </Link>) :
                                                    (<Link to={`/Quiz/${dbQuiz._id}`}>
                                                        <Button type="primary"
                                                            style={{ margin: "5px", width: "100%", background: "#FD5F00", borderColor: "#FD5F00" }}
                                                            shape="round" >
                                                            Play
                                                        </Button>
                                                    </Link>
                                                    )}
                                                <Link to={`/Leaderboard/${dbQuiz._id}`}>
                                                    <Button type="primary" style={{ margin: "5px", width: "100%", background: "#05004E", borderColor: "#05004E" }} shape="round">See Leaderboard</Button>
                                                </Link>
                                                {dbQuiz.leaderboard.find(player => player.player === Auth.getProfile().data.username) ?
                                                    (<div className='playedQuizMark'>Played</div>) : ('')}

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