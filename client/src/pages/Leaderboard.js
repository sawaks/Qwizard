import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import '../CSS/leaderboard.css';
import { GET_LEADERBOARD } from '../utils/queries';

import { Helmet } from 'react-helmet-async';

const Leaderboard = () => {
    const { quizId } = useParams();
    const { loading, data } = useQuery(GET_LEADERBOARD, {
        variables: { quizId },
    });
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        if (data) {
            console.log('data', data)
            let sortedLeaderboard = [...data.getLeaderboard.leaderboard];
            console.log('unsortedLeaderboard', sortedLeaderboard)
            sortedLeaderboard = sortedLeaderboard.sort((a, b) => b.points - a.points);
            console.log('sortedLeaderboard', sortedLeaderboard)
            setLeaderboard(sortedLeaderboard);
        }
    }, [data]);
    return (
        <div className="leaderboard-container">
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="leaderboard">
                    <div className="leaderboard-header">
                    <h1>Leaderboard</h1>
                    </div>
                    {leaderboard?.length > 0 ? (
                        <ol className="leaderboard-list">
                            {leaderboard.map((leaderboard) => {
                                return (
                                    <li className= "leaderboard-li">
                                        {leaderboard.player}: {leaderboard.points}
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

                    <Button href="/" className="leaderboard-btn">Go Back</Button>
                </div>


            )
            }
        </div >
    );
}
export default Leaderboard;