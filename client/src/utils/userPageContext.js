import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

// Create our theme context using React.CreateContext()
export const userPageContext = createContext();

// Create a custom hook that allows easy access to our ThemeContext values
export const useUserPageContext = () => useContext(userPageContext);

export default function UserPageProvider({ children }) {

    const { data } = useQuery(GET_ME);
    console.log(data)
    const [userData, setUserData] = useState([]);
    const [userData2, setUserData2] = useState([]);

    useEffect(() => {
        if(data){
            setUserData(data.me.createdQuizzes);
            setUserData2(data.me.playedQuizzes);
        }
    }, [data])


    return (

        <userPageContext.Provider value={{ userData, userData2, setUserData }}>
            {children}
        </userPageContext.Provider>

    );

};
