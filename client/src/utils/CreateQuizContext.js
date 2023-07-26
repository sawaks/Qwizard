import React, { createContext, useContext, useState } from 'react';

// Create our theme context using React.CreateContext()
export const CreateQuizContext = createContext();

// Create a custom hook that allows easy access to our ThemeContext values
export const useCreateQuizContext = () => useContext(CreateQuizContext);

export default function CreateQuizProvider({ children }) {

    const [quizId, setQuizId] = useState(0);

    const [quizDetails, setQuizDetails] = useState(
        {
            title: '',
            description: '',
            imgURL: './booktheme.png',
        });


    return (
        <CreateQuizContext.Provider value={{ quizId, setQuizId, quizDetails, setQuizDetails }}>
            {children}
        </CreateQuizContext.Provider>
    );
};
