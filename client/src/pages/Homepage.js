import React from 'react';
import { useQuery } from '@apollo/client';
import Hero from '../components/HeroSection';
import QuizListSection from '../components/QuizListSection';
import Navbar from '../components/UserPageNavi';

import witch from '../images/witch.png';
import wizard from '../images/hero-wizard.png';

import { GET_DB_QUIZZES } from '../utils/queries';

import { Helmet } from 'react-helmet-async';

import Auth from '../utils/auth';

const HomePage = () => {
    const { loading, data, refetch } = useQuery(GET_DB_QUIZZES);
    console.log(data);
    const dbQuizzes = data?.dbQuizzes || [];
    return (

        <div>
            <Helmet>
                <title>Qwizard | Home Page</title>
                <meta name="description" content="Welcome to Qwizard! Enjoy and create your own Quiz." />
            </Helmet>

            {Auth.loggedIn() ? (
                <div style={{ marginTop: "50px", marginLeft: "40px", marginRight: "35px" }}>
                    <Navbar
                        leftLinkTo='/createQuiz'
                        rightLinkTo='/myQuizzes'
                        leftTitle='Create a Quiz!'
                        rightTitle='My Profile'
                        rightSrc={wizard}
                        leftSrc={witch}

                    />
                </div>
            ) : (<Hero />)}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <QuizListSection
                    dbQuizzes={dbQuizzes}
                    refetch={refetch}
                />
            )}

        </div>
    );
};

export default HomePage;