
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, Image, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { useCreateQuizContext } from '../utils/CreateQuizContext';

import { ADD_QUIZ } from '../utils/mutations';
// IMG URLS NEED UPDATING
// URL REROUTING NEEDS UPDATING

const CreateQuizDetails = () => {

    useEffect(() => {
        setShowModal(true);
    }, []);

    const { setQuizId, quizDetails, setQuizDetails} = useCreateQuizContext();

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

    const handleQuizSubmit = async (event) => {
        console.log("handleQuizSubmit");

        try {
          const {data} = await addQuiz({
            variables: {  input: { ...quizDetails} }
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
                                    name="imgURL"
                                    value={quizDetails.theme}
                                    onChange={handleQuizInputChange}
                                >
                                    <option value='./logo512.png'>Default</option>
                                    <option value='./logo512.png'>Dark</option>
                                    <option value='./logo512.png'>Light</option>
                                </select>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={6}>
                        <Image src={quizDetails.imgURL} />
                    </Col>
                </Row>

            </Modal>
        </>
    );
};

export default CreateQuizDetails;