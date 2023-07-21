import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Row, Col, Input, Select, Alert } from 'antd';
import { ADD_QUESTION } from '../utils/mutations';

import { useCreateQuizContext } from '../utils/CreateQuizContext';


const CreateQuizQuestions = () => {
    const { quizId } = useCreateQuizContext();
    const [missingFields, setMissingFields] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("Please fill all form fields");

    const [quizQuestions, setQuizQuestions] = useState([]);

    const [thisQuestion, setThisQuestion] = useState({correctAnswer: "answer1"});

    const [addQuestion] = useMutation(ADD_QUESTION);

    const handleQuestionInputChange = async (event) => {
        const { name, value } = event.target;
        setThisQuestion({ ...thisQuestion, [name]: value });

        console.log(thisQuestion);
    };

    const handleSelectChange = (value) => {
        setThisQuestion({ ...thisQuestion, correctAnswer: value });
        console.log(thisQuestion);
    };


    const openQuestion = (event) => {
        console.log("openQuestion");
        console.log(event.target.id);
    };

    const saveQuestion = async () => {
        console.log("saveQuestion");
        console.log(thisQuestion);
        if (!thisQuestion.timeLimit || isNaN(thisQuestion.timeLimit)) {
            setAlertMessage("Time limit must be a number");
            setMissingFields(true);
            return;
        } else if (!thisQuestion.questionText || thisQuestion.questionText.length === 0) {
            setAlertMessage("Question is required");
            setMissingFields(true);
            return;
        } else if (!thisQuestion.answer1 || thisQuestion.answer1.length === 0) {
            setAlertMessage("Answer 1 is required");
            setMissingFields(true);
            return;
        } else if (!thisQuestion.answer2 || thisQuestion.answer2.length === 0) {
            setAlertMessage("Answer 2 is required");
            setMissingFields(true);
            return;
        } else if (!thisQuestion.answer3 || thisQuestion.answer3.length === 0) {
            setAlertMessage("Answer 3 is required");
            setMissingFields(true);
            return;
        } else if (!thisQuestion.answer4 || thisQuestion.answer4.length === 0) {
            setAlertMessage("Answer 4 is required");
            setMissingFields(true);
            return;
        }
        setMissingFields(false);
        setAlertMessage("Please fill all form fields");

        let correctAnswer;
        switch (thisQuestion.correctAnswer) {
            case "answer1":
                correctAnswer = thisQuestion.answer1;
                break;
            case "answer2":
                correctAnswer = thisQuestion.answer2;
                break;
            case "answer3":
                correctAnswer = thisQuestion.answer3;
                break;
            case "answer4":
                correctAnswer = thisQuestion.answer4;
                break;
            default:
                correctAnswer = thisQuestion.answer1;
        }

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

        questionInput.questionId = data.addQuestion._id;
        setQuizQuestions([...quizQuestions, questionInput]);

        console.log(quizQuestions);
    };

    const createNewQuestion = () => {
        console.log("openNewQuestion");
    };

    return (
        <div>
            <Row>
                <Col span={6}>
                    {quizQuestions.length > 0 ? (
                        quizQuestions.map((question) => {
                            return (
                                <Button
                                    id={quizQuestions._id}
                                    width='100%'
                                    onClick={openQuestion}
                                > Question {quizQuestions.indexOf(question) + 1}</Button>
                            )
                        })

                    ) : (
                        <></>
                    )}
                    <Button
                        onClick={createNewQuestion}
                    >Add Question</Button>
                </Col>
                <Col span={12}>
                    <h1>Question</h1>
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
                                name='questionText'
                            />
                        </Form.Item>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="Answer 1"
                                    rules={[{ required: true, message: 'Please input your answer!' }]}
                                >
                                    <Input
                                        onChange={handleQuestionInputChange}
                                        name='answer1'
                                    />
                                </Form.Item>

                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Answer 2"
                                    rules={[{ required: true, message: 'Please input your answer!' }]}
                                >
                                    <Input
                                        onChange={handleQuestionInputChange}
                                        name='answer2'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="Answer 3"
                                    rules={[{ required: true, message: 'Please input your answer!' }]}
                                >
                                    <Input
                                        onChange={handleQuestionInputChange}
                                        name='answer3'
                                    />
                                </Form.Item>

                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Answer 4"
                                    rules={[{ required: true, message: 'Please input your answer!' }]}
                                >
                                    <Input
                                        onChange={handleQuestionInputChange}
                                        name='answer4'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Row>
                            <Col>
                                <Button
                                    onClick={saveQuestion}
                                >Save Question</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={6}>
                    <h1>Extra Details</h1>
                    <Form>
                        <Form.Item
                            label="Correct Answer"
                            name='correctAnswer'

                        >
                            <Select
                                onChange={handleSelectChange}
                                // defaultValue="answer1"
                                name='correctAnswer'
                                key='correctAnswer'
                            >
                                <Select.Option value="answer1">Answer 1</Select.Option>
                                <Select.Option value="answer2">Answer 2</Select.Option>
                                <Select.Option value="answer3">Answer 3</Select.Option>
                                <Select.Option value="answer4">Answer 4</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Time Limit"
                            rules={[{ required: true, message: 'Please input your answer!' }]}
                        >
                            <Input
                                onChange={handleQuestionInputChange}
                                name='timeLimit'
                                rules={[{ required: true, message: 'Please input a number!' },
                                { type: 'number', min: 1 }]}
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>


        </div>
    );
};

export default CreateQuizQuestions;