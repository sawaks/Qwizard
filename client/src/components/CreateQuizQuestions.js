import React, { useEffect, useState } from 'react';
import { Form, Button, Image, Row, Col, Input } from 'antd';
import { } from '../utils/mutations';

// import { useCreateQuizContext } from '../utils/CreateQuizContext';


const CreateQuizQuestions = () => {
    // const { quizId } = useCreateQuizContext();

    const [isTrueorFalse, setIsTrueorFalse] = useState(false);

    const [quizQuestions, setQuizQuestions] = useState([]);

    const [thisQuestion, setThisQuestion] = useState([]);

    const handleQuestionInputChange = (event) => {
        const { name, value } = event.target;
        setThisQuestion({ [name]: value });

        setQuizQuestions([...quizQuestions, thisQuestion]);
    };

    const openQuestion = (event) => {
        console.log("openQuestion");
        console.log(event.target.id);
    };

    const openNewQuestion = () => {
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
                    )
                    }
                    <Button
                        onClick={openNewQuestion}
                    >Add Question</Button>
                </Col>
                <Col span={12}>
                    <h1>Question</h1>
                    <Form>
                        <Form.Item
                            label="Title"
                            rules={[{ required: true, message: 'Please input your question!' }]}
                        >
                            <Input
                                onChange={handleQuestionInputChange}
                                name='quiestionText'
                            />
                        </Form.Item>
                        <Row>
                            <Col span={12}>
                            </Col>
                            <Col span={12}>
                            </Col>
                            <Col span={12}>
                            </Col>
                            <Col span={12}>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={6}>
                    <h1>Extra Details</h1>
                </Col>
            </Row>


        </div>
    );
};

export default CreateQuizQuestions;