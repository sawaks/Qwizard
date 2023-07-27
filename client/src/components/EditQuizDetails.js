import React, { useState, useEffect } from 'react';
import { Form, Button, Image, Col, Row, Input, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import EditImage from '../images/edit.png'

import witchHat from '../images/witch-hat2.png'
import theme1 from '../images/booktheme.png';
import theme2 from '../images/cardstheme.png';
import theme3 from '../images/magiciantheme.png';

import { EDIT_QUIZ } from '../utils/mutations';
import { GET_QUIZ_QUESTIONS } from '../utils/queries';

import { useCreateQuizContext } from '../utils/CreateQuizContext';
import '../CSS/createDetails.css'
import { Link } from 'react-router-dom';
const { TextArea } = Input;

const EditQuizDetails = (props) => {

    // console.log(props)
    const { quizId, setQuizId, quizDetails, setQuizDetails } = useCreateQuizContext();
    const { data } = useQuery(GET_QUIZ_QUESTIONS, {
        variables: { quizId: props.value.param }
    });
    const [imgSRC, setImgSRC] = useState(theme1);

    useEffect(() => {
        if(quizDetails.imgURL === "./booktheme.png") {
            setImgSRC(theme1);
        } else if(quizDetails.imgURL === "./cardstheme.png") {
            setImgSRC(theme2);
        } else if(quizDetails.imgURL === "./magiciantheme.png") {
            setImgSRC(theme3);
        }
    }, [quizDetails.imgURL])
        
    useEffect(() => {
        setToEdit(false);

        if (props.value.param !== 0 && data) {
            setQuizId(props.value.param);
            // console.log(data.getQuizQuestions)
            if (data.getQuizQuestions.imgURL) {
                if (data.getQuizQuestions.imgURL === "./booktheme.png") {
                    setImgSRC(theme1);
                } else if (data.getQuizQuestions.imgURL === "./cardstheme.png") {
                    setImgSRC(theme2);
                } else if (data.getQuizQuestions.imgURL === "./magiciantheme.png") {
                    setImgSRC(theme3);
                }
            }
            setQuizDetails({
                title: data.getQuizQuestions.title,
                description: data.getQuizQuestions.description,
                imgURL: data.getQuizQuestions.imgURL,
            });
        }

    }, [data, props.value.param, setQuizId, setQuizDetails]);

    const [isEdit, setToEdit] = useState(false);
    const [editQuiz] = useMutation(EDIT_QUIZ);


    const handleQuizInputChange = (event) => {
        const { name, value } = event.target;
        setQuizDetails({ ...quizDetails, [name]: value });

    };

    const handleSelectChange = (value) => {
        // console.log(`selected ${value}`);
        // let imgURL;
        if (value === "./booktheme.png") {
            setImgSRC(theme1);
        } else if (value === "./cardstheme.png") {
            setImgSRC(theme2);
        } else if (value === "./magiciantheme.png") {
            setImgSRC(theme3);
        }
        setQuizDetails({ ...quizDetails, imgURL: value });
    };

    const handleQuizDetailsUpdate = async (event) => {
        console.log("handleQuizDetailsUpdate");

        if (!quizDetails.title || !quizDetails.description) {
            return;
        }

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
        <div >
            {isEdit ? (
                <Row className='editQuestionComp'>
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
                            <Form.Item label="Theme">
                                <Select
                                    id="QuizTheme"
                                    name="imgURL"
                                    value={quizDetails.imgURL}
                                    onChange={handleSelectChange}
                                >
                                    <Select.Option value="./booktheme.png">Default</Select.Option>
                                    <Select.Option value="./magiciantheme.png">Fun</Select.Option>
                                    <Select.Option value="./cardstheme.png">Educational</Select.Option>
                                </Select>
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={handleQuizDetailsUpdate}
                                block
                                className='orangeBtn'
                            >
                                Save</Button>
                        </Form>
                    </Col>
                    <Col span={6} id="imgContainer">
                        <Image alt="theme img" id="themeIMG2" src={imgSRC} />
                    </Col>
                </Row>
            ) : (
                <Row align={"middle"} id="QdetailsContainer" className='editQuestionComp'>
                    <Col span={4} align={"middle"}>
                        <Image alt="theme img" id="themeIMG3" src={imgSRC} />
                    </Col>
                    <Col span={16} id="quizDetails" >
                        <img id="witchHat-edit" src={witchHat} alt="witch hat" />
                        <h4>{quizDetails.title}</h4>
                        <h6>{quizDetails.description}</h6>
                    </Col>
                    <Col span={4} align={"start"} >
                        <Link onClick={() => setToEdit(true)}>
                        <img id="edit-quiz-Icon" src={EditImage} alt="edit" onClick={() => setToEdit(true)} />
                        </Link>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default EditQuizDetails;