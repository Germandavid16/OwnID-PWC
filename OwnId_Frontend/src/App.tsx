import './App.css'
import { OwnID, WidgetType } from "@ownid/react";
import React from 'react';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "./routes.ts";


function App() {

    const emailField = React.useRef(null);
    const passwordField = React.useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const respOwnId = localStorage.getItem('loggedIn');
        if(respOwnId) {
            return navigate(ROUTES.account);
        }

        setLoading(false);
    }, [])
    // const {} = useRouter
    function onLogin(data: {token: string}) {
        console.log("=>(App.tsx:12) data from backend", data);
        localStorage.setItem('sessionID', JSON.stringify({ token: data.token }));
        localStorage.setItem('loggedIn', 'yes');
        navigate(ROUTES.account)
    }

    if(loading) {
        return <h4>Loading...</h4>
    }

    return (
        <form>
            <OwnID type={WidgetType.Login}
                   passwordField={passwordField}
                   loginIdField={emailField}
                   onError={(error) => console.error(error)}
                   onLogin={onLogin} />
            <div >
                <input ref={emailField} onChange={() => null} type="email" name="email"/>

            </div>
            <div>
                <input ref={passwordField} onChange={() => null} type="password" name="password"/>
            </div>
            <div>
                <button type="submit">Log In</button>
            </div>
            <div style={{marginTop: 20}}>
                <button onClick={() => navigate('register')} type="button">Register</button>

            </div>

        </form>
    );
}

export default App
