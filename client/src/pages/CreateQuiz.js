import React from 'react';
// import { useParams } from 'react-router-dom';

import CreateQuizDetails from '../components/CreateQuizDetails';
import CreateQuizQuestions from '../components/CreateQuizQuestions';
import EditQuizDetails from '../components/EditQuizDetails';

import CreateQuizProvider from '../utils/CreateQuizContext';
// import { useCreateQuizContext } from '../utils/CreateQuizContext';



const CreateQuiz = () => {
    // const { quizId } = useParams();

    return (
        <CreateQuizProvider>
            <CreateQuizDetails />
            <EditQuizDetails />
            <CreateQuizQuestions />
        </CreateQuizProvider>
    );
};

export default CreateQuiz;