import React, { useState } from "react";
import axios from "axios";

const loginUrl = 'https://h7swmj8oc1.execute-api.eu-west-1.amazonaws.com/dev/login'; // TODO: 这里应该是设置的环境参数

export default () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const submit = async(e) => {
        e.preventDefault();

        const email = e.target.getElementsByTagName("input")[0].value

        setLoading(true);
        try {
            const {data} = await axios.post(loginUrl, {email})
            setResult(data)
            setLoading(false)
        }catch(e){
            console.log('Request failed', e)
            setResult(e.response.data)
            setLoading(false)
        }

    };

    if (loading) {
        return (<p>登录中...</p>);
    }

    if (result) {
        if (result.error) {
            return (
                <>
                    <h1>登录失败</h1>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </>
            );
        } else {
            return (
                <>
                    <p>通常我们注册完成，会有登录链接。可以点击一下链接进入登录页面</p>
                    <p><a href={result.demoUrl} target="_blank">{result.demoUrl}</a></p>
                </>
            );
        }
    }

    return (
        <>
            <h1>注册</h1>
            <p>输入Eamil</p>
            <form onSubmit={(e) => submit(e)}>
                <input type="email" required placeholder="example@163.com"/>
                <button type={submit}>注册</button>
            </form>
        </>
    );
}
