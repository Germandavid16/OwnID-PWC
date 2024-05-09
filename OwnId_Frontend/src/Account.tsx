import React from 'react';
import {useNavigate} from "react-router-dom";


export const Account:React.FC = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = React.useState('');
    const [authMethod, setAuthMethod] = React.useState('');
    React.useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if(!loggedIn) {
            return navigate('/');
        }
        const respOwnId = localStorage.getItem('ownid-s');
        if(!respOwnId) {
            return navigate('/');
        }

        const data = JSON.parse(respOwnId);

        if(!data.lastUser) {
            return navigate('/');
        }

        setUserEmail(data?.lastUser?.loginId);
        setAuthMethod(data?.lastUser?.authMethod);

    }, [])

    const logOut = () => {
        localStorage.removeItem('loggedIn');
        return navigate('/');
    }

    return (
        <>
            <h1>Account</h1>
            <h2> Email: {userEmail}</h2>
            <h3>Auth Method: {authMethod}</h3>
            <button onClick={logOut} type="button">Log Out</button>

        </>
    )
}
