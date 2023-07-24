import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_QUIZ_QUESTIONS } from '../utils/queries';
import { ADD_LEADERBOARD } from '../utils/mutations';

const Quiz = () => {

    const { quizId } = useParams();
    const { loading, data } = useQuery(GET_QUIZ_QUESTIONS, {
        variables: { quizId },
    });

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
    }, [quizQuestions, questionIndex]);

    function checkAnswer(event) {
        if (event.target.dataset.id === activeQuestion.correctAnswer) {
            setResult((result + 1) * (timer + 1));
            setTimeout(() => {
                endTimer();
            }, 1000);
            // add CSS to show correct answer
        }
        else {
            // add CSS to show wrong answer
            setTimeout(() => {
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
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="quiz-container">
                    <h1>{data.getQuizQuestions.title}</h1>
                    <div className="quiz-card">
                        {activeQuestion && timer ? (
                            <>
                                <h2>{activeQuestion.questionText}</h2>
                                <h2 className="timer">Time Left:{timer} </h2>
                                <div className="answer-card">

                                    <Button data-id={activeQuestion.answer1} value={activeQuestion.answer1} onClick={checkAnswer}>
                                        <span data-id={activeQuestion.answer1}>
                                            {activeQuestion.answer1}
                                        </span>
                                    </Button>
                                    <Button data-id={activeQuestion.answer2} value={activeQuestion.answer2} onClick={checkAnswer}>
                                        <span data-id={activeQuestion.answer2}>
                                            {activeQuestion.answer2}
                                        </span>
                                    </Button>
                                    <Button data-id={activeQuestion.answer3} value={activeQuestion.answer3} onClick={checkAnswer}>
                                        <span data-id={activeQuestion.answer3}>
                                            {activeQuestion.answer3}
                                        </span>
                                    </Button>
                                    <Button data-id={activeQuestion.answer4} value={activeQuestion.answer4} onClick={checkAnswer}>
                                        <span data-id={activeQuestion.answer4}>
                                            {activeQuestion.answer4}
                                        </span>
                                    </Button>

                                </div>
                            </>
                        ) : (
                            <>
                                {end ? (
                                    <>
                                        <h1>Quiz Completed</h1>
                                        <h1>Score:{result}</h1>
                                        <Button href="/">Go Back</Button>
                                        <Button href={`/leaderboard/${quizId}`}>Leaderboard</Button>
                                    </>
                                ) : (
                                    <>
                                        <h1>Loading...</h1>
                                    </>
                                )}
                            </>
                        )}

                    </div>
                </div>

            )}
        </div>
    );
}
export default Quiz;