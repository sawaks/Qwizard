import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Image } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import '../CSS/quiz.css';
import { GET_QUIZ_QUESTIONS } from '../utils/queries';
import { ADD_LEADERBOARD } from '../utils/mutations';
import leftIcon from '../images/wizard.png';
import titleIcon from "../images/crystal-ball2.png";
import rightIcon from '../images/potion.png';
import theme1 from '../images/booktheme.png';
import theme2 from '../images/cardstheme.png';
import theme3 from '../images/magiciantheme.png';
import DesignedTitle from '../components/DesignedTitle';

const Quiz = () => {

    const [quizIMG, setQuizImg] = useState();
    const { quizId } = useParams();
    const { loading, data } = useQuery(GET_QUIZ_QUESTIONS, {
        variables: { quizId },
    });
    const [intro, setIntro] = useState(true);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(quizQuestions[0]);
    const [timer, setTimer] = useState();
    const [result, setResult] = useState(0);
    const [end, setEnd] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [addLeaderboard] = useMutation(ADD_LEADERBOARD);

    useEffect(() => {
        if (data) {
            setQuizQuestions([]);
            console.log('data', data)
            if (data.getQuizQuestions.imgURL) {
                if (data.getQuizQuestions.imgURL === "./booktheme.png") {
                    setQuizImg(theme1);
                } else if (data.getQuizQuestions.imgURL === "./cardstheme.png") {
                    setQuizImg(theme2);
                } else if (data.getQuizQuestions.imgURL === "./magiciantheme.png") {
                    setQuizImg(theme3);
                }
            }
            setQuizQuestions(data.getQuizQuestions.questions.map((question) => ({
                id: question._id,
                questionText: question.questionText,
                timeLimit: question.timeLimit,
                answer1: question.answers[0].answerText,
                answer2: question.answers[1].answerText,
                answer3: question.answers[2].answerText,
                answer4: question.answers[3].answerText,
                correctAnswer: question.correctAnswer,
            })));

        }
    }, [data]);

    useEffect(() => {
        if (intro === false) {
            if (quizQuestions.length > 0) {
                if (questionIndex >= quizQuestions.length) {
                    setEnd(true);
                    setActiveQuestion(null);
                    setTimer(0);
                    submitLeaderboard();
                    return;
                }
                startTimer(quizQuestions[questionIndex].timeLimit);
                setActiveQuestion(quizQuestions[questionIndex]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizQuestions, questionIndex, intro]);

    function checkAnswer(event) {
        if (event.target.dataset.id === activeQuestion.correctAnswer) {
            setResult((result + 1) * (timer + 1));
            event.target.classList.add('correct-answer');
            setTimeout(() => {
                event.target.classList.remove('correct-answer');
                endTimer();
            }, 1000);
        }
        else {
            event.target.classList.add('wrong-answer');
            setTimeout(() => {
                event.target.classList.remove('wrong-answer');
                endTimer();
            }, 1000);
            return;
        }


    };

    const startTimer = (Time) => {
        setTimer(Time--);
        const questionTimer = setInterval(() => {
            if (Time > 0) {
                setTimer(Time--)
            } else if (Time === 0) {
                endTimer();
            }
        }, 1000);

        setIntervalId(questionTimer);
    };

    const endTimer = () => {
        // setTimer(0);
        clearInterval(intervalId);
        setQuestionIndex(questionIndex + 1);
    };

    const submitLeaderboard = async (event) => {
        try {
            const { data } = await addLeaderboard({
                variables: {
                    quizId,
                    points: result
                }
            });
            console.log(data);

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="master-div">


            <div>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (

                    <div className="quiz-container">
                        <Row justify="center">
                            <Col span={4}
                                className="left-icon"><img src={leftIcon} alt="create icon" />
                            </Col>
                            <Col justify="center" span={16}>
                                <DesignedTitle color={"rgb(253, 95, 0)"} title={data.getQuizQuestions.title} src={titleIcon} />
                                {intro ? (
                                    <div className="ready-btn-div">
                                        <Button className="ready-btn" onClick={() => setIntro(false)}>Ready?</Button>
                                    </div>
                                ) : (
                                    <div className="quiz-play-card">
                                        {activeQuestion && timer ? (
                                            <>
                                                <Row align='middle'>
                                                    <Col span={24} >
                                                        <Image src={quizIMG} alt="imgURL" id='quiz-play-img' />

                                                        <h2 className="timer">Time Left:{timer} </h2>

                                                        <h2 className="play-question">{activeQuestion.questionText}</h2>

                                                    </Col>
                                                </Row>
                                                <div className="answer-play-card">

                                                    <Row>
                                                        <Col span={12} className="answer-play-btn-col">
                                                            <Button data-id={activeQuestion.answer1}
                                                                value={activeQuestion.answer1}
                                                                onClick={checkAnswer}
                                                                className="answer-play-btn"
                                                                block
                                                            >
                                                                <span data-id={activeQuestion.answer1}>
                                                                    {activeQuestion.answer1}
                                                                </span>
                                                            </Button>
                                                        </Col>
                                                        <Col span={12} className="answer-play-btn-col">
                                                            <Button data-id={activeQuestion.answer2}
                                                                value={activeQuestion.answer2}
                                                                onClick={checkAnswer}
                                                                className="answer-play-btn"
                                                                block
                                                            >
                                                                <span data-id={activeQuestion.answer2}>
                                                                    {activeQuestion.answer2}
                                                                </span>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={12} className="answer-play-btn-col">
                                                            <Button data-id={activeQuestion.answer3}
                                                                value={activeQuestion.answer3}
                                                                onClick={checkAnswer}
                                                                className="answer-play-btn"
                                                                block
                                                            >
                                                                <span data-id={activeQuestion.answer3}>
                                                                    {activeQuestion.answer3}
                                                                </span>
                                                            </Button>
                                                        </Col>
                                                        <Col span={12} className="answer-play-btn-col">
                                                            <Button data-id={activeQuestion.answer4}
                                                                value={activeQuestion.answer4}
                                                                onClick={checkAnswer}
                                                                className="answer-play-btn"
                                                                block
                                                            >
                                                                <span data-id={activeQuestion.answer4}>
                                                                    {activeQuestion.answer4}
                                                                </span>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {end ? (
                                                    <div >
                                                        <Row className="end-play-quiz" >
                                                            <Col span={24} align='middle' justify='middle'>
                                                                <h1>Quiz Completed</h1>
                                                                <h1>Score:{result}</h1>
                                                                <Row>
                                                                    <Col span={8} className='end-btn-div'>
                                                                        <Button
                                                                        className='greenBtn end-play-btn'
                                                                            block
                                                                            href="/">Home</Button>
                                                                    </Col>
                                                                    <Col span={8} className='end-btn-div'>
                                                                        <Button
                                                                        block
                                                                        className='blueBtn end-play-btn'
                                                                            href={`/leaderboard/${quizId}`}>Leaderboard</Button>
                                                                    </Col>
                                                                    <Col span={8} className='end-btn-div'>
                                                                        <Button 
                                                                        block
                                                                        className='orangeBtn end-play-btn'
                                                                        href={`/Quiz/${quizId}`}>Play Again</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h1>Loading...</h1>
                                                    </>
                                                )}
                                            </>
                                        )}

                                    </div>
                                )}
                            </Col>
                            <Col span={4} className="right-icon"><img src={rightIcon} alt="icon"/>
                            </Col>
                        </Row>

                    </div>
                )}

            </div>
        </div >
    );
}
export default Quiz;