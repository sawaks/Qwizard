import React from 'react';
import titleIcon from "../images/magic-book.png";
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
                <div className="icon-container icon-created-container"><img src={titleIcon} /></div>
            </div>
            <div className="playedCard-container">
                {userData &&
                    userData.map((userData) => (
                        <Card
                            key={userData.playedQuizzes._id}
                            className="playedCard"
                            cover={<img alt="example" src={quizImg} style={{ borderRadius: "0", border: "solid 1px black" }} />}
                        >
                            <Meta title={userData.playedQuizzes.title} />
                            <p style={{ textAlign: "start" }}>{userData.playedQuizzes.description}</p>
                            <Button as={Link} to="/" type="primary" style={{ backgroundColor: "#FD5F00", border: "solid 1px #FD5F00" }} shape="round" >Replay</Button>
                            <Button as={Link} to="/" type="primary" style={{ backgroundColor: "#05004E", border: "solid 1px #05004E" }} shape="round" >Leaderboard</Button>
                        </Card>
                    ))}

            </div>



        </div>
    )
}

export default PlayedQuizList