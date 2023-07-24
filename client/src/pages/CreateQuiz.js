import React from 'react';
import { useParams } from 'react-router-dom';

import CreateQuizDetails from '../components/CreateQuizDetails';
import CreateQuizQuestions from '../components/CreateQuizQuestions';
import EditQuizDetails from '../components/EditQuizDetails';

import CreateQuizProvider from '../utils/CreateQuizContext';
import UserPageProvider from '../utils/userPageContext';

import { Helmet } from 'react-helmet-async';


const CreateQuiz = () => {

    const { quizId } = useParams();
    console.log('quizIdParam', quizId)



    return (
        <CreateQuizProvider>
            <Helmet>
                <title>Qwizard | Create Quiz</title>
                <meta name="description" content="Create and update your own quiz!" />
            </Helmet>
            {quizId ? (
                <>
                    <EditQuizDetails value={{ param: quizId }} />
                    <CreateQuizQuestions value={{ param: quizId }} />
                </>
            ) : (
                <>
                    <UserPageProvider>
                        <CreateQuizDetails />
                    </UserPageProvider>
                    <EditQuizDetails value={{ param: 0 }} />
                    <CreateQuizQuestions value={{ param: 0 }} />
                </>

            )
            }
        </CreateQuizProvider >
    );
};

export default CreateQuiz;