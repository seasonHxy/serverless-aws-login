import React, { useEffect, useState } from "react";
import Auth from "@aws-amplify/auth";

export default () => {
    const [session, setSession] = useState(null);

    const getSession = async() => {
        try {
            const user = await Auth.currentSession();
            setSession(user);
        } catch (e) {
        }
    };

    const signOut = async() => {
        await Auth.signOut();
        window.location.reload();
    };

    useEffect(() => {
        getSession();
    }, []);

    return (
        <>

            <p>你已成功登录。</p>
            <button onClick={signOut}>注销</button>

            <p>Session object:</p>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </>
    );
}
