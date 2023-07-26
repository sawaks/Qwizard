import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

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
        <div className="container">
            <Helmet>
                <title>Qwizard | Leaderboard</title>
                <meta name="description" content="Viewing all players by ranking" />
            </Helmet>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="leaderboard">
                    <h1>Leaderboard</h1>
                    {leaderboard?.length > 0 ? (
                        <ol className="list">
                            {leaderboard.map((leaderboard) => {
                                return (

                                    <li>
                                        player: {leaderboard.player}:
                                        points: {leaderboard.points}
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

                    <Button href="/">Go Back</Button>
                </div>


            )
            }
        </div >
    );
}
export default Leaderboard;