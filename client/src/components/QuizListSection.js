import React from 'react';
// import { Col, Row } from 'antd';
import titleIcon from "../images/magnifying-glass.png";
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const QuizListSection = ({ dbQuizzes, title }) => {
    if (!dbQuizzes.length) {
        return (
            <div className="quizList-container">
                <div className="title-conatiner">
                    <h2>{title}</h2>
                    <div className="icon-container"><img src={titleIcon} /></div>
                </div>
                <h4>No Quiz Yet</h4>
            </div>
        )
    }
    return (
        <div className="quizList-container">
            <div className="title-conatiner">
                <h2>{title}</h2>
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
                                        <Button as={Link} to='/' type="primary" style={{ margin: "5px", width: "200px", background: "#FD5F00", borderColor: "#FD5F00" }} shape="round" >Play</Button>
                                        <Button as={Link} to='/' type="primary" style={{ margin: "5px", width: "200px", background: "#05004E", borderColor: "#05004E" }} shape="round">See Leaderboard</Button>
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