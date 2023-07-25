import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Button, Row, Col, Input, Select, Alert } from 'antd';
import { ADD_QUESTION, EDIT_QUESTION } from '../utils/mutations';
import { GET_QUIZ_QUESTIONS } from '../utils/queries';

import sword from '../images/sword.png'

import { useCreateQuizContext } from '../utils/CreateQuizContext';
import '../CSS/createDetails.css'

const CreateQuizQuestions = (props) => {

    const { loading, data } = useQuery(GET_QUIZ_QUESTIONS, {
        variables: { quizId: props.value.param }
    });

    const [questionNumber, setQuestionNumber] = useState(1);
    const { quizId, setQuizId } = useCreateQuizContext();
    const [missingFields, setMissingFields] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("Please fill all form fields");
    const [selectValue, setSelectValue] = useState(null);

    const [quizQuestions, setQuizQuestions] = useState([]);

    const [thisQuestion, setThisQuestion] = useState({});

    // if editing quiz, set quizId and quizQuestions
    useEffect(() => {
        if (props.value.param !== 0 && data) {
            setQuizId(props.value.param);
            console.log(data.getQuizQuestions)
            setQuizQuestions([]);
            setQuizQuestions(data.getQuizQuestions.questions.map((question) => ({
                id: question._id,
                questionText: question.questionText,
                timeLimit: question.timeLimit,
                answer1: question.answers[0].answerText,
                answer2: question.answers[1].answerText,
                answer3: question.answers[2].answerText,
                answer4: question.answers[3].answerText,
                correctAnswer: saveCorrectSelect(question, question.correctAnswer)
            })));

            if (!thisQuestion?.id) {
                setQuestionNumber(data.getQuizQuestions.questions.length + 1);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const [addQuestion] = useMutation(ADD_QUESTION);
    const [editQuestion] = useMutation(EDIT_QUESTION);

    const handleQuestionInputChange = async (event) => {
        const { name, value } = event.target;
        setThisQuestion({ ...thisQuestion, [name]: value });
    };

    const handleSelectChange = (value) => {
        setThisQuestion({ ...thisQuestion, correctAnswer: value });
        setSelectValue(value);
    };


    const openQuestion = (event) => {
        console.log("openQuestion");
        const question = quizQuestions.find(question => question.id === event.target.dataset.id);
        setThisQuestion(question);
        setSelectValue(question.correctAnswer);
        setQuestionNumber(quizQuestions.indexOf(question) + 1);
    };

    const saveQuestion = async () => {
        console.log("saveQuestion");
        console.log(thisQuestion);

        if (isThisInputInvalid()) {
            return;
        }

        setMissingFields(false);
        setAlertMessage("Please fill all form fields");

        let correctAnswer = saveCorrectAnswer(thisQuestion, thisQuestion.correctAnswer);

        const questionInput = {
            questionText: thisQuestion.questionText,
            timeLimit: parseInt(thisQuestion.timeLimit),
            correctAnswer: correctAnswer,
            answers: [
                { answerText: thisQuestion.answer1 },
                { answerText: thisQuestion.answer2 },
                { answerText: thisQuestion.answer3 },
                { answerText: thisQuestion.answer4 }
            ]
        };

        const { data } = await addQuestion({
            variables: { quizId: quizId, input: questionInput }
        });

        const currentQuestion = {
            id: data.addQuestion._id,
            questionText: data.addQuestion.questionText,
            timeLimit: data.addQuestion.timeLimit,
            answer1: questionInput.answers[0].answerText,
            answer2: questionInput.answers[1].answerText,
            answer3: questionInput.answers[2].answerText,
            answer4: questionInput.answers[3].answerText,
            correctAnswer: thisQuestion.correctAnswer
        }
        setThisQuestion(currentQuestion);

        setQuizQuestions([...quizQuestions, currentQuestion]);

        console.log(quizQuestions);
    };

    const createNewQuestion = () => {
        console.log("createNewQuestion");
        setThisQuestion({});
        setSelectValue(null);
        setQuestionNumber(quizQuestions.length + 1);
    };

    const updateQuestion = async () => {
        console.log("updateQuestion");

        if (isThisInputInvalid()) {
            return;
        }

        setMissingFields(false);
        setAlertMessage("Please fill all form fields");

        let correctAnswer = saveCorrectAnswer(thisQuestion, thisQuestion.correctAnswer);


        const questionInput = {
            questionText: thisQuestion.questionText,
            timeLimit: parseInt(thisQuestion.timeLimit),
            correctAnswer: correctAnswer,
            answers: [
                { answerText: thisQuestion.answer1 },
                { answerText: thisQuestion.answer2 },
                { answerText: thisQuestion.answer3 },
                { answerText: thisQuestion.answer4 }
            ]
        };

        const { data } = await editQuestion({
            variables: { questionId: thisQuestion.id, input: questionInput }
        });

        const currentQuestion = {
            id: data.editQuestion._id,
            questionText: data.editQuestion.questionText,
            timeLimit: data.editQuestion.timeLimit,
            answer1: questionInput.answers[0].answerText,
            answer2: questionInput.answers[1].answerText,
            answer3: questionInput.answers[2].answerText,
            answer4: questionInput.answers[3].answerText,
            correctAnswer: thisQuestion.correctAnswer
        }
        setThisQuestion(currentQuestion);

        const currentQuestions = quizQuestions.filter(question => question.id !== currentQuestion.id);
        setQuizQuestions([...currentQuestions, currentQuestion]);

        console.log(quizQuestions);
    };

    const isThisInputInvalid = () => {
        if (!thisQuestion.timeLimit || isNaN(thisQuestion.timeLimit)) {
            setAlertMessage("Time limit must be a number");
            setMissingFields(true);
            return true;
        } else if (!thisQuestion.questionText || thisQuestion.questionText.length === 0) {
            setAlertMessage("Question is required");
            setMissingFields(true);
            return true;
        } else if (!thisQuestion.answer1 || thisQuestion.answer1.length === 0) {
            setAlertMessage("Answer 1 is required");
            setMissingFields(true);
            return true;
        } else if (!thisQuestion.answer2 || thisQuestion.answer2.length === 0) {
            setAlertMessage("Answer 2 is required");
            setMissingFields(true);
            return true;
        } else if (!thisQuestion.answer3 || thisQuestion.answer3.length === 0) {
            setAlertMessage("Answer 3 is required");
            setMissingFields(true);
            return true;
        } else if (!thisQuestion.answer4 || thisQuestion.answer4.length === 0) {
            setAlertMessage("Answer 4 is required");
            setMissingFields(true);
            return true;
        } else if (!thisQuestion.correctAnswer || thisQuestion.correctAnswer.length === 0) {
            setAlertMessage("Correct Answer is required");
            setMissingFields(true);
            return true;
        }

        return false;
    }

    const saveCorrectAnswer = (question, select) => {
        let correctAnswer;

        switch (select) {
            case "0":
                correctAnswer = question.answer1;
                break;
            case "1":
                correctAnswer = question.answer2;
                break;
            case "2":
                correctAnswer = question.answer3;
                break;
            case "3":
                correctAnswer = question.answer4;
                break;
            default:
                correctAnswer = question.answer1;
        }

        return correctAnswer;
    }

    const saveCorrectSelect = (question, correctAnswer) => {
        let selectAnswer;

        switch (correctAnswer) {
            case question.answers[0].answerText:
                selectAnswer = "0";
                break;
            case question.answers[1].answerText:
                selectAnswer = "1";
                break;
            case question.answers[2].answerText:
                selectAnswer = "2";
                break;
            case question.answers[3].answerText:
                selectAnswer = "3";
                break;
            default:
                selectAnswer = "";
        }

        return selectAnswer;
    }


    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <Row id="QuestionCreate">
                    <Col span={4} id="questionCreateBtns">
                        {quizQuestions.length > 0 ? (
                            quizQuestions.map((question) => {
                                return (
                                    <Button
                                        data-id={question.id}
                                        width='100%'
                                        onClick={openQuestion}
                                        block
                                        className='blueBtn'
                                    >
                                        <span data-id={question.id}>
                                            Question {quizQuestions.indexOf(question) + 1}
                                        </span></Button>
                                )
                            })

                        ) : (
                            <></>
                        )}
                        <Button
                            className="orangeBtn"
                            block
                            onClick={createNewQuestion}
                        >Add Question</Button>
                    </Col>
                    <Col span={14} id="questionCreateBody">
                        <h1>
                        <img src={sword} alt="magic wand" id='editSword'/>
                            Question #
                            <span>
                                {questionNumber}
                            </span>
                        </h1>
                        {missingFields ? (
                            <Alert
                                message="Missing Fields"
                                description={AlertMessage}
                                type="error"
                                closable
                                onClose={() => setMissingFields(false)}
                            />
                        ) : (
                            <></>
                        )}
                        <Form>
                            <Form.Item
                                label="Title"
                                rules={[{ required: true, message: 'Please input your question!' }]}
                            >
                                <Input
                                    onChange={handleQuestionInputChange}
                                    value={thisQuestion?.questionText}
                                    placeholder='What is 1+1?'
                                    name='questionText'
                                />
                            </Form.Item>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="Answer 1"
                                        rules={[{ required: true, message: 'Please input your answer!' }]}
                                        className='createAnwerLeft'
                                    >
                                        <Input
                                            onChange={handleQuestionInputChange}
                                            name='answer1'
                                            value={thisQuestion?.answer1}
                                            placeholder='1'
                                        />
                                    </Form.Item>

                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Answer 2"
                                        rules={[{ required: true, message: 'Please input your answer!' }]}
                                        className='createAnwerRight'
                                    >
                                        <Input
                                            onChange={handleQuestionInputChange}
                                            name='answer2'
                                            value={thisQuestion?.answer2}
                                            placeholder='2'
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="Answer 3"
                                        rules={[{ required: true, message: 'Please input your answer!' }]}
                                        className='createAnwerLeft'
                                    >
                                        <Input
                                            onChange={handleQuestionInputChange}
                                            name='answer3'
                                            value={thisQuestion?.answer3}
                                            placeholder='3'
                                        />
                                    </Form.Item>

                                </Col>
                                <Col span={12} >
                                    <Form.Item
                                        label="Answer 4"
                                        rules={[{ required: true, message: 'Please input your answer!' }]}
                                        className='createAnwerRight'
                                    >
                                        <Input
                                            onChange={handleQuestionInputChange}
                                            name='answer4'
                                            value={thisQuestion?.answer4}
                                            placeholder='4'
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Row>
                                <Col span={24}>
                                    {thisQuestion?.id ? (
                                        <Button
                                            className='orangeBtn'
                                            block
                                            onClick={updateQuestion}
                                            data-id={thisQuestion.id}
                                        >Update Question</Button>
                                    ) : (
                                        <Button
                                            className='orangeBtn'
                                            block
                                            onClick={saveQuestion}
                                        >Save Question</Button>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col span={6} id="questionCreateDetails">
                        <h1>Extra Details</h1>
                        <Form>
                            <Form.Item
                                className='extraDetailsTitle'
                                label="Correct Answer"
                            >
                                <Select
                                    onChange={handleSelectChange}
                                    name='correctAnswer'
                                    key='correctAnswer'
                                    value={selectValue}
                                    placeholder='Select Correct Answer'
                                >
                                    <Select.Option value="0" className="answerbtn">Answer 1</Select.Option>
                                    <Select.Option value="1" className="answerbtn">Answer 2</Select.Option>
                                    <Select.Option value="2" className="answerbtn">Answer 3</Select.Option>
                                    <Select.Option value="3" className="answerbtn">Answer 4</Select.Option>
                                </Select>


                            </Form.Item>
                            <Form.Item
                                label="Time Limit (seconds)"
                                className='extraDetailsTitle'
                                rules={[{ required: true, message: 'Please input your answer!' }]}
                            >
                                <Input
                                    onChange={handleQuestionInputChange}
                                    name='timeLimit'
                                    value={thisQuestion?.timeLimit}
                                    placeholder='10'
                                    rules={[{ required: true, message: 'Please input a number!' },
                                    { type: 'number', min: 1 }]}
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

            )}
        </div >

    );
};

export default CreateQuizQuestions;