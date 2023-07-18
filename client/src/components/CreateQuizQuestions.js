import React, { useEffect } from 'react';
// import { Form, Modal, Button, Alert } from 'antd';
import { } from '../utils/mutations';

import { useCreateQuizContext } from '../utils/CreateQuizContext';


const CreateQuizQuestions = () => {
    const { quizId } = useCreateQuizContext();

    console.log("create quiz questions");
    console.log(quizId);

    useEffect(() => {
        // setShowModal(true);
        console.log("state??");
        console.log(quizId);

    }, [quizId]);

    return (
        <div>
            <h1>time to create for real for real</h1>

        </div>
    );
};

export default CreateQuizQuestions;