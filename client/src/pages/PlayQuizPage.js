import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_QUIZ_QUESTIONS } from '../utils/queries';


const Quiz = () => {

    const { quizId } = useParams();
    const { loading, data } = useQuery(GET_QUIZ_QUESTIONS, {
        variables: { quizId },
    });

    const [questionIndex, setQuestionIndex] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(quizQuestions[0]);
    const [timer, setTimer] = useState(0);
    const [result, setResult] = useState(0);


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
            setActiveQuestion(quizQuestions[questionIndex]);
            setTimer(quizQuestions[questionIndex].timeLimit);
            startTimer(quizQuestions[questionIndex].timeLimit);
        }
    }, [quizQuestions, questionIndex]);

    function checkAnswer(event) {
        if (event.target.dataset.id === activeQuestion.correctAnswer) {
            setResult(result + 1);
            setQuestionIndex(questionIndex + 1);
            alert("correct");
        }
        else {
            alert("wrong");

            return;
        }


    };

    const startTimer = (Time) => {
        const questionTimer = setInterval(() => {
            if (Time > 0) {
                setTimer(Time--)
            } else if (Time === 0) {
                clearInterval(questionTimer);
                setQuestionIndex(questionIndex + 1);
            }
        }, 1000);
    };

    return (
        <div className="master-div">
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="quiz-container">
                    <h1>{data.getQuizQuestions.title}</h1>
                    <div className="quiz-card">
                        {activeQuestion ? (
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
                                <h1>Loading...</h1>
                            </>
                        )}

                    </div>
                    <p className="score-card">score:{result}</p>
                </div>

            )}
        </div>
    );
}
export default Quiz;