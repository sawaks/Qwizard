import React from 'react';
import { useQuery } from '@apollo/client';
import Hero from '../components/HeroSection';
import QuizListSection from '../components/QuizListSection';

import { GET_DB_QUIZZES } from '../utils/queries';

import Auth from '../utils/auth';

const HomePage = () => {
    const { loading, data } = useQuery(GET_DB_QUIZZES);
    const dbQuizzes = data?.dbQuizzes || [];
    return (
        <div>

            {Auth.loggedIn() ? (
                <Hero style={{ display: "none" }} />
            ) : (
                <Hero />
            )}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <QuizListSection
                    dbQuizzes={dbQuizzes}
                    title="Quiz List"
                />
            )}

        </div>
    );
};

export default HomePage;