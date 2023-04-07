import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const MainPage = () => {

    const navigate = useNavigate(); 
    const ToActivity = () => {
        navigate('/borrow');
    }

    useEffect(() => {
        ToActivity();
    }, []);

    return (
        <></>
    )
}
export default MainPage