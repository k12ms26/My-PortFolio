import React from 'react';
import {useLocation} from 'react-router';

const ShowModel = (props) => {
    const location = useLocation();
    console.log(location.state.id)
    return (
        <h1>Hello!</h1>
    )
}

export default ShowModel