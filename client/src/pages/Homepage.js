import React from 'react';
import { useQuery } from '@apollo/client';
import Hero from '../components/HeroSection';
import QuizListSection from '../components/QuizListSection';

import { GET_DB_QUIZZES } from '../utils/queries';

import { Helmet } from 'react-helmet-async';

import Auth from '../utils/auth';

const HomePage = () => {
    const { loading, data } = useQuery(GET_DB_QUIZZES);
    console.log(data);
    const dbQuizzes = data?.dbQuizzes || [];
    return (

        <div>
            <Helmet>
                <title>Qwizard | Home Page</title>
                <meta name="description" content="Welcome to Qwizard! Enjoy and create your own Quiz." />
            </Helmet>

            {Auth.loggedIn() ? ('') : (<Hero />)}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <QuizListSection
                    dbQuizzes={dbQuizzes}

                />
            )}

        </div>
    );
};

export default HomePage;