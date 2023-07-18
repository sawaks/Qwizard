
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, Alert, Image, Divider, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useCreateQuizContext } from '../utils/CreateQuizContext';

// IMG URLS NEED UPDATING
// ADD CREATE QUIZ MUTATION ON SUBMIT

const CreateQuizDetails = () => {

    useEffect(() => {
        setShowModal(true);
    }, []);

    const { quizId, setQuizId} = useCreateQuizContext();

    // const [state, dispatch] = useReducer(reducer, initialState);

    const [showModal, setShowModal] = useState(true);

    const navigate = useNavigate();
    const handleModalCancel = () => {
        setShowModal(false);
        navigate("/homepage");
    };

    const [quizDetails, setUserFormData] = useState(
        {
            title: 'My Quiz',
            description: 'Description',
            imageURL: './logo512.png',
        });

    const handleQuizInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...quizDetails, [name]: value });

    };

    /// NEEDS UPDATING!!!!!
    const handleQuizSubmit = async (event) => {
        console.log("handleQuizSubmit");
        // event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        // const { Title, Description, Theme } = event.currentTarget;
        // use EDIT Details mutation instead of loginUser function
        // try {
        //   const {data} = await loginUser({
        //     variables: {...userFormData}
        //   });
        // } catch (e) {
        //   console.error(e);
        // //   setShowAlert(true);
        // }

        setShowModal(false);

        setQuizId(12345);
        console.log(quizId)
    };

    return (
        <>
            <Modal
                centered={true}
                width={800}
                open={showModal}
                title="Create a Quiz"
                onCancel={() => handleModalCancel()}
                footer={[
                    <Button key="submit" form="QuizDetails" htmlType="submit">
                        Save
                    </Button>,
                ]}
            >
                <Row>
                    <Col span={18}>
                        <Form
                            validateMessages={{ required: 'Fields cannot be empty' }}
                            id="QuizDetails"
                            span={18}
                            onFinish={handleQuizSubmit}
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
                                    name="imageURL"
                                    value={quizDetails.theme}
                                    onChange={handleQuizInputChange}
                                >
                                    <option value="./default">Default</option>
                                    <option value="./dark">Dark</option>
                                    <option value="./light">Light</option>
                                </select>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={6}>
                        <Image src={quizDetails.imageURL} />
                    </Col>
                </Row>

            </Modal>
        </>
    );
};

export default CreateQuizDetails;