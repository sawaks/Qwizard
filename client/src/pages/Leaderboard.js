import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_LEADERBOARD } from '../utils/queries';


const Leaderboard = () => {    

    return (
    <div className="">
        {loading ? (
            <h1>Loading...</h1>
        ) : (
            <div className="leaderboard">
                <h1>Leaderboard</h1>
            </div>

        )}
    </div>
);
}
export default Leaderboard;