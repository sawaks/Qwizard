import React from 'react';
import titleIcon from "../images/crystal-ball2.png";
import quizImg from "../images/quizImg.png";
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const PlayedQuizList = ({ userData }) => {
    if (!userData.length) {
        return (
            <div className="playedQuizList-Container">
                <div className="title-conatiner title-created-conatiner">
                    <h2 className="history">Play History</h2>
                    <div className="icon-container icon-created-container"><img src={titleIcon} /></div>
                </div>
                <h3>Not Played Quiz Yet</h3>
            </div>
        )
    }
    return (
        <div className="playedQuizList-Container">
            <div className="title-conatiner title-created-conatiner">
                <h2 className="history">Play History</h2>
                <div className="icon-container icon-created-container">
                    <img src={titleIcon} alt="crystal ball" />
                </div>
            </div>
            <div className="playedCard-container">
                {userData &&
                    userData.map((userData) => (
                        <Card
                            key={userData.playedQuizzes._id}
                            className="playedCard"
                            cover={<img alt="quiz" src={quizImg} style={{ borderRadius: "0", border: "solid 1px black" }} />}
                        >
                            <Meta title={userData.playedQuizzes.title} />
                            <p style={{ textAlign: "center" }}><span style={{ fontWeight: "bold" }}>Point:</span>{userData.playedQuizzes.leaderboard.point}</p>
                            <Link to={`/playQuiz/${userData.playedQuizzes._id}`}>
                                <Button type="primary" style={{ backgroundColor: "#FD5F00", border: "solid 1px #FD5F00" }} shape="round" >Replay</Button>
                            </Link>
                            <Link to={`/leaderboard/${userData.playedQuizzes._id}`}>
                                <Button type="primary" style={{ backgroundColor: "#05004E", border: "solid 1px #05004E" }} shape="round" >Leaderboard</Button>
                            </Link>
                        </Card>
                    ))}

            </div>



        </div>
    )
}

export default PlayedQuizList