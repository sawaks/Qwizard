import React, { useEffect, useState } from 'react';
import titleIcon from "../images/crystal-ball2.png";
import DesignedTitle from './DesignedTitle';

import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useUserPageContext } from '../utils/userPageContext';

const { Meta } = Card;

const PlayedQuizList = () => {
    const { userData2, refetch } = useUserPageContext();

    useEffect(() => {
        refetch();
    }, [userData2])

    const [playedQuizzes, setPlayedQuizzes] = useState(userData2);

    useEffect(() => {
        setPlayedQuizzes([...userData2].reverse());
    }, [userData2])


    if (!userData2.length) {
        return (
            <div className="playedQuizList-Container">
                {/* <div className="title-conatiner title-created-conatiner">
                    <h2 className="history">Play History</h2>
                    <div className="icon-container icon-created-container"><img src={titleIcon} alt="crystalball"/></div>
                </div> */}
                <DesignedTitle title="Play History" color="#76B39D" src={titleIcon} />
                <h3>Not Played Quiz Yet</h3>
            </div>
        )
    }
    return (
        <div className="playedQuizList-Container">
            {/* <div className="title-conatiner title-created-conatiner">
                <h2 className="history">Play History</h2>
                <div className="icon-container icon-created-container">
                    <img src={titleIcon} alt="crystal ball" />
                </div>
            </div> */}
            <DesignedTitle title="Play History" color="#76B39D" src={titleIcon} />

            <div className="playedCard-container">
                {playedQuizzes &&
                    playedQuizzes.map((userData) => (

                        <Card
                            key={userData._id}
                            className="playedCard"
                            cover={<img alt="quiz" src={userData.imgURL} style={{ borderRadius: "0", border: "solid 1px black" }} />}
                        >
                            <Meta title={userData.title} />
                            <p style={{ textAlign: "center" }}><span style={{ fontWeight: "bold" }}>Points:</span> {userData.leaderboard[userData.leaderboard.length - 1].points}</p>
                            <Link to={`/Quiz/${userData._id}`}>
                                <Button type="primary" style={{ width: "100%", backgroundColor: "#FD5F00", border: "solid 1px #FD5F00" }} shape="round" >Play Again</Button>
                            </Link>
                            <Link to={`/Leaderboard/${userData._id}`}>
                                <Button type="primary" style={{ width: "100%", backgroundColor: "#05004E", border: "solid 1px #05004E" }} shape="round" >Leaderboard</Button>
                            </Link>
                        </Card>
                    ))}

            </div>



        </div>
    )
}

export default PlayedQuizList