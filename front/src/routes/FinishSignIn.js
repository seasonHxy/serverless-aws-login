import React, { useEffect, useState } from "react";
import Auth from "@aws-amplify/auth";
import { Redirect } from "react-router";

export default ({ match: { params: { challenge } } }) => { // 匹配到传参
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const finishSignin = async(challenge) => {
        try {
            const [email, code] = challenge.split(',');
            const user = await Auth.signIn(email);
            await Auth.sendCustomChallengeAnswer(user, code);
            await Auth.currentSession();
            setSuccess(true);
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
        finishSignin(challenge);
    }, [challenge]);

    if (error) {
        return (
            <>
                <h1>登录失败</h1>
                <h2>{JSON.stringify(error, null, 2)}</h2>
            </>
        );
    }

    if (success) {
        return (
            <Redirect to="/"/>
        );
    }

    return (<p>正登录中...</p>);
}
