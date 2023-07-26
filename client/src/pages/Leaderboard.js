import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'antd';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import '../CSS/leaderboard.css';
import { GET_LEADERBOARD, GET_ME } from '../utils/queries';
import titleIcon from "../images/crystal-ball2.png";
import starIcon from "../images/star.png";
import DesignedTitle from '../components/DesignedTitle';
import footerIcon from "../images/town.png";
import { Helmet } from 'react-helmet-async';

const Leaderboard = () => {
    const { quizId } = useParams();
    const [playedBefore, setPlayedBefore] = useState(false);
    const { loading, data } = useQuery(GET_LEADERBOARD, {
        variables: { quizId },
    });
    const { data: playedData } = useQuery(GET_ME);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        if (data) {
            console.log('data', data)
            if (playedData) {
                console.log('playedData', playedData)
                playedData.me.playedQuizzes.forEach((playedQuiz) => {
                    if (playedQuiz._id === quizId) {
                        setPlayedBefore(true);
                    }
                });
            }
            let sortedLeaderboard = [...data.getLeaderboard.leaderboard];
            console.log('unsortedLeaderboard', sortedLeaderboard)
            sortedLeaderboard = sortedLeaderboard.sort((a, b) => b.points - a.points);
            console.log('sortedLeaderboard', sortedLeaderboard)
            setLeaderboard(sortedLeaderboard);
        }
    }, [data, playedData]);
    return (
        <div id="lead-container">
            <Helmet>
                <title>Qwizard | Leaderboard</title>
                <meta name="description" content="Viewing all players by ranking" />
            </Helmet>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="leaderboard-master-div">
                    <div className="star-icon">
                        <img src={starIcon} />
                        <img src={starIcon} />
                        <img src={starIcon} />
                    </div>
                    <div className="leaderboard">
                        <DesignedTitle title="Leaderboard" src={titleIcon} />

                        <div className='leaderboard-card'>
                            <Row className='leaderboard-btn-div'>
                                <Col span={12}>
                                    <Button href="/" className="leaderboard-btn">Home</Button>
                                </Col>
                                <Col span={12}>
                                    {playedBefore ? (
                                        <Button href={`/Quiz/${quizId}`} className="leaderboard-play-btn">Play Again</Button>
                                    ) : (
                                        <Button href={`/Quiz/${quizId}`} className="leaderboard-play-btn">Play</Button>
                                    )}

                                </Col>
                            </Row>
                            {leaderboard?.length > 0 ? (
                                <ol className="leaderboard-list">
                                    {leaderboard.map((leaderboard) => {
                                        return (
                                            <li className="leaderboard-li">
                                                <span>{leaderboard.player}</span> <span>{leaderboard.points}</span>
                                            </li>
                                        )


                                    })}

                                </ol>

                            ) : (<>
                                {leaderboard?.length === 0 ? (
                                    <h1>No one has played this quiz yet</h1>
                                ) : (
                                    <h1>Loading</h1>
                                )}
                            </>
                            )}

                        </div>
                    </div>
                    <div className="leaderboard-footer-icon"><img src={footerIcon} /></div>
                </div>
            )
            }
        </div >
    );
}
export default Leaderboard;