import React from 'react';
import CreateQuizDetails from '../components/CreateQuizDetails';
import CreateQuizQuestions from '../components/CreateQuizQuestions';


import CreateQuizProvider from '../utils/CreateQuizContext';


const CreateQuiz = () => {

    return (
        <CreateQuizProvider>
            <h1>time to create</h1>
            <CreateQuizDetails/>
            <CreateQuizQuestions/>
        </CreateQuizProvider>
    );
};

export default CreateQuiz;