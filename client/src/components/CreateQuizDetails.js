
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, Image, Col, Row, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { useCreateQuizContext } from '../utils/CreateQuizContext';

import { ADD_QUIZ } from '../utils/mutations';
import '../CSS/createDetails.css'

const { TextArea } = Input;
// IMG URLS NEED UPDATING
// URL REROUTING NEEDS UPDATING

const CreateQuizDetails = () => {


    useEffect(() => {
        setShowModal(true);
    }, []);

    const { setQuizId, quizDetails, setQuizDetails } = useCreateQuizContext();

    const [showModal, setShowModal] = useState(true);

    const [addQuiz] = useMutation(ADD_QUIZ);


    // CHANGE!!!!!!!!!!!!!!!
    const navigate = useNavigate();
    const handleModalCancel = () => {
        setShowModal(false);
        navigate("/");
    };

    const handleQuizInputChange = (event) => {
        const { name, value } = event.target;
        setQuizDetails({ ...quizDetails, [name]: value });

    };

    const handleSelectChange = (value) => {
        console.log(`selected ${value}`);
        setQuizDetails({ ...quizDetails, imgURL: value });
    };

    const handleQuizSubmit = async (event) => {
        console.log("handleQuizSubmit");


        if (!quizDetails.title || !quizDetails.description) {
            return;
        }

        try {
            const { data } = await addQuiz({
                variables: { input: { ...quizDetails } }
            });

            setQuizId(data.addQuiz._id);
            setShowModal(false);
        } catch (e) {
            console.error(e);
        }

        // console.log(quizId);
    };

    return (
        <>
            <Modal
                className="mode"
                centered={true}
                width={800}
                open={showModal}
                title="Create a Quiz"
                onCancel={() => handleModalCancel()}
                footer={[
                    <Button block key="submit" form="QuizDetails" htmlType="submit">
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
                                <Input
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
                                <TextArea
                                    type="text"
                                    id="QuizDescription"
                                    name="description"
                                    placeholder="Description"
                                    onChange={handleQuizInputChange}
                                    value={quizDetails.description}
                                    required
                                />
                            </Form.Item>
                            <Form.Item className="mode-label"label="Theme">
                                <Select
                                    id="QuizTheme"
                                    onChange={handleSelectChange}
                                    name='imgURL'
                                    key='imgURL'
                                    placeholder="Select a theme"
                                    value={quizDetails.imgURL? quizDetails.imgURL : './logo512.png'}

                                >
                                    <Select.Option value='./logo512.png'>Default</Select.Option>
                                    <Select.Option value='./logo512.png2'>Dark</Select.Option>
                                    <Select.Option value='./logo512.png3'>Light</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={6}>
                        <Image id="themeIMG"alt="theme" src={quizDetails.imgURL} />
                    </Col>
                </Row>

            </Modal>
        </>
    );
};

export default CreateQuizDetails;