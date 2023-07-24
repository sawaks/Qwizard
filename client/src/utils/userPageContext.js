import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
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

    const [getMe, { loading, data2 }] = useLazyQuery(GET_ME);

    useEffect(() => {
        if(data){
            setUserData(data.me.createdQuizzes);
            setUserData2(data.me.playedQuizzes);
        }
    }, [data])

    useEffect(() => {
        getMe();
        if(data2){
            setUserData(data2.me.createdQuizzes);
            setUserData2(data2.me.playedQuizzes);
        }

    }, [userData])

    return (

        <userPageContext.Provider value={{ userData, userData2, setUserData, setUserData2 }}>
            {children}
        </userPageContext.Provider>

    );

};
