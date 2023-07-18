import React, { useState, useEffect } from 'react';
import { Form, Button, Image, Col, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { EDIT_QUIZ } from '../utils/mutations';

import { useCreateQuizContext } from '../utils/CreateQuizContext';

// NEEDS TO UPDATE DATABASE!!!!!

const EditQuizDetails = () => {
    
    useEffect(() => {
        setToEdit(false);
    }, []);
    
    const { quizId, quizDetails, setQuizDetails } = useCreateQuizContext();

    const [isEdit, setToEdit] = useState(false);
    const [editQuiz] = useMutation(EDIT_QUIZ);


    const handleQuizInputChange = (event) => {
        const { name, value } = event.target;
        setQuizDetails({ ...quizDetails, [name]: value });

    };

    const handleQuizDetailsUpdate = async (event) => {
        console.log("handleQuizDetailsUpdate");

        try {
            await editQuiz({
                variables: { quizId, input: { ...quizDetails } }
            });

            setToEdit(false);
        } catch (e) {
            console.error(e);
        }

    };

    return (
        <>
            {isEdit ? (
                <Row>
                    <Col span={18}>
                        <Form
                            validateMessages={{ required: 'Fields cannot be empty' }}
                            id="UpdateQuizDetails"
                            span={18}
                        // onFinish={handleQuizSubmit}
                        >
                            <Form.Item
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <input
                                    type="text"
                                    id="QuizTitle"
                                    name="title"
                                    placeholder="My Quiz"
                                    onChange={handleQuizInputChange}
                                    value={quizDetails.title}
                                    required
                                />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <textarea
                                    type="text"
                                    id="QuizDescription"
                                    name="description"
                                    placeholder="Description"
                                    onChange={handleQuizInputChange}
                                    value={quizDetails.description}
                                    required
                                />
                            </Form.Item>
                            <Form.Item label="Theme">
                                <select
                                    id="QuizTheme"
                                    name="imgURL"
                                    value={quizDetails.theme}
                                    onChange={handleQuizInputChange}
                                >
                                    <option value="./default">Default</option>
                                    <option value="./dark">Dark</option>
                                    <option value="./light">Light</option>
                                </select>
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={handleQuizDetailsUpdate}
                            >
                                Save</Button>
                        </Form>
                    </Col>
                    <Col span={6}>
                        <Image src={quizDetails.imageURL} />
                    </Col>
                </Row>
            ) : (
                <Row>
                    {/* <Col span={18}> */}
                    <p>Title: {quizDetails.title}</p>
                    <p>Description: {quizDetails.description}</p>
                    <p>Theme: {quizDetails.imageURL}</p>
                    <EditOutlined onClick={() => setToEdit(true)} />
                    {/* </Col> */}
                </Row>
            )}
        </>
    );
};

export default EditQuizDetails;