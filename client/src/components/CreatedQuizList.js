import React, { useEffect } from 'react'
import titleIcon from "../images/magic-wand3.png";
// import quizImg from "../images/quizImg.png";
import DesignedTitle from './DesignedTitle';
import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_QUIZ } from '../utils/mutations';

import { useUserPageContext } from '../utils/userPageContext';

const CreatedQuizList = () => {

    const { userData, setUserData, refetch } = useUserPageContext();
    console.log('userData in createdQuizes', userData)

    useEffect(() => {
        refetch();
    }, [])

    const [removeQuiz] = useMutation(REMOVE_QUIZ);

    const handleDeleteQuestion = async (event) => {

        const quizId = event.target.dataset.id;

        try {
            await removeQuiz({
                variables: { quizId },
            });

            const filteredQuizzes = userData.filter((quiz) => quiz._id !== quizId);
            setUserData(filteredQuizzes);
        } catch (err) {
            console.error(err);
        }
    }

    if (!userData.length) {
        return (
            <div className="createdQuizList-Container">
                <DesignedTitle title="Your Created Quiz" src={titleIcon} />
                <h3>Not Created Quiz Yet</h3>
            </div>)
    }
    return (
        <div className="createdQuizList-Container">
            <DesignedTitle title="Your Created Quiz" src={titleIcon} />
            {userData &&
                userData.map((userData) => (
                    <Row key={userData._id} justify="space-between" className="createdQuizCard-container">
                        <Col xs={24} sm={24} md={10} lg={10} xl={10} className="createdImg-container">
                            <img src={userData.imgURL} alt="quiz" />
                            {/* <div style={{ width: "100px", backgroundImage: `url(${userData.imgURL})` }}></div> */}
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={14} xl={14} className="createdQuizText-container">
                            <h4>{userData.title}</h4>
                            <p>{userData.description}</p>
                            <div className='created-card-button-container'>
                                <Link to={`/editQuiz/${userData._id}`}>
                                    <Button type="primary" style={{ backgroundColor: "#FD5F00", border: "solid 1px #FD5F00" }} shape="round" >Update</Button>
                                </Link>
                                <Link to={`/Leaderboard/${userData._id}`}>
                                    <Button type="primary" style={{ backgroundColor: "#05004E", border: "solid 1px #05004E" }} shape="round" >Leaderboard</Button>
                                </Link>
                                <Button type="primary" danger shape="round" data-id={userData._id} onClick={handleDeleteQuestion}>
                                    <span data-id={userData._id}>
                                        Delete
                                    </span>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                ))}

        </div>
    )
}

export default CreatedQuizList