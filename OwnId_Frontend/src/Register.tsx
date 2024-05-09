import {OwnID, WidgetType} from "@ownid/react";
import React, {useRef, useState} from "react";
import {ROUTES} from "./routes.ts";
import {useNavigate} from "react-router-dom";
export function RegisterComponent() {
    const emailField = useRef(null);
    const passwordField = useRef(null);
    const [ownIDData] = useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        console.log("=>(Register.tsx:10) 12312312312", 12312312312);
    }, []);
    React.useEffect(() => {
        console.log("=>(Register.tsx:13) ownIDData", ownIDData);
    }, [ownIDData]);
    // Stores ownIdData
   async function onRegister(ownIdData:any) {
       const myHeaders = new Headers();
       myHeaders.append("Content-Type", "application/json");
       const body = JSON.stringify({
           email: ownIdData.loginId,
           ownIdData: ownIdData.data
       });
        try {
            await fetch('https://d2e9-78-10-55-34.ngrok-free.app/users/signup', {
                method: 'POST',
                headers: myHeaders,
                body,
            })
            localStorage.setItem('sessionID', JSON.stringify({ token: 'data.token' }));
            localStorage.setItem('loggedIn', 'yes');
            navigate(ROUTES.account)
        } catch (e) {
            console.log("=>(Register.tsx:23) e", e);
        }
    }

    const register = async (data: {email: string, ownIdData: string}) => {
        console.log("=>(Register.tsx:15) data", data);
    }

    function onSubmit(userData: any) {
        userData.preventDefault();
        console.log("=>(Register.tsx:19) userData", userData);
        //Call your existing registration logic in the backend
        return register({ ...userData, ...{ ownIdData: ownIDData } });
        // YtwH3ZF1@&6Z2mI#
    }
    function onLogin(data: {token: string}) {
        console.log("=>(App.tsx:12) data from backend", data);
        localStorage.setItem('sessionID', JSON.stringify({ token: data.token }));
        localStorage.setItem('loggedIn', 'yes');
        navigate(ROUTES.account)
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <input ref={emailField} type="email" name="email" />
            <input ref={passwordField} type="password" name="password" />
            <button type="submit">Register</button>
            <OwnID type={WidgetType.Register}
                   loginIdField={emailField}
                   passwordField={passwordField}
                   onError={(error) => console.error(error)}
                   onLogin={onLogin}
                   onRegister={onRegister} />
        </form>
    );
}
