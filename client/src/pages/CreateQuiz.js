import React from 'react';
import { useParams } from 'react-router-dom';

import CreateQuizDetails from '../components/CreateQuizDetails';
import CreateQuizQuestions from '../components/CreateQuizQuestions';
import EditQuizDetails from '../components/EditQuizDetails';

import CreateQuizProvider from '../utils/CreateQuizContext';
// import { useCreateQuizContext } from '../utils/CreateQuizContext';


const CreateQuiz = () => {

    const { quizId } = useParams();
    console.log('quizIdParam', quizId)



    return (
        <CreateQuizProvider>
            {quizId ? (
                <>
                    <EditQuizDetails value={{ param: quizId }} />
                    <CreateQuizQuestions value={{ param: quizId }} />
                </>
            ) : (
                <>
                    <CreateQuizDetails />
                    <EditQuizDetails value={{ param: 0 }}/>
                    <CreateQuizQuestions value={{ param: 0 }}/>
                </>

            )}
        </CreateQuizProvider>
    );
};

export default CreateQuiz;