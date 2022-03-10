import React, { useState, useEffect } from 'react';
import Auth from '@aws-amplify/auth';

import LoginForm from "../components/LoginForm";
import LoggedIn from "../components/LoggedIn";

export default () => {
    const [state, setState] = useState('loading');

    const getSession = async() => {
        try {
            await Auth.currentSession();
            setState('logged-in');
        } catch (e) {
            setState('login');
        }
    };

    useEffect(() => {
        getSession();
    }, []);

    switch (state) {
    case 'loading':
        return <p>加载中...</p>;
    case 'logged-in':
        return <LoggedIn/>;
    case 'login':
        return <LoginForm/>;
    }
}
