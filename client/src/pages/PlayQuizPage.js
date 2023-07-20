import React, { useState } from 'react';
import { Button } from 'antd';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_QUIZ_QUESTIONS } from '../utils/queries';

const Quiz = () => {

    const { quizId } = useParams();



    // const { loading, data } = useQuery(GET_QUIZ_QUESTIONS, {
    //     variables: { quizId: quizId },
    // });
    const data = {
        quizAuthor: "buddy",
        description: "this is a quiz",
        title: "hippo quiz",
        imgURL: "String",
        questions: [{
            questionText: "what is a hippo?",
            timeLimit: 20,
            correctAnswer: "a hippo",
            answers: [{ answerText: "not a string" },
            { answerText: "a zebra" },
            { answerText: "a string" },
            { answerText: "a hippo" }],
        },
        {
            questionText: "what is a zebra?",
            timeLimit: 20,
            correctAnswer: "a zebra",
            answers: [{ answerText: "not a string" },
            { answerText: "a zebra" },
            { answerText: "a string" },
            { answerText: "a hippo" }],
        },]
    };
    const [activeQuestion, setActiveQuestion] = useState(data.questions[0]);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [result, setResult] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);

    function checkAnswer(event) {
        
        setSelectedAnswer(event.target.value);

        console.log(selectedAnswer);
        if (selectedAnswer === activeQuestion.correctAnswer) {
            setResult(result + 1);
        }
        else {
            alert("wrong");

            return;
        }
        // setQuestionIndex(questionIndex + 1);

    };
    // function nextQuestion() { };
    // function finishQuiz() { };
    // function startQuiz() { };
    // function setQTimer() { };


    return (
        <div className="quiz-container">
            <h1>{data.title}</h1>
            <div className="quiz-card">
                <h2>{activeQuestion.questionText}</h2>
                <div className="answer-card">
                    {data.questions[questionIndex].answers.map((answer) => (
                        <Button key={answer.answerText} value={answer.answerText} onClick={checkAnswer}>
                            {/* <span> */}
                                {answer.answerText}
                                {/* </span> */}
                        </Button>
                    ))}
                </div>
            </div>
            <p className="score-card">score:{result}</p>
        </div>
    );
}
export default Quiz;