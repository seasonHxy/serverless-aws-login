const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async(event) => {

    try {
        const { email } = JSON.parse(event.body);
        // 设置Cognito的自定义属性
        const authChallenge = uuid();
        await cognito.adminUpdateUserAttributes({
            UserAttributes: [
                {
                    Name: 'custom:authChallenge',
                    Value: `${authChallenge},${Math.round((new Date()).valueOf() / 1000)}`
                }
            ],
            UserPoolId: process.env.USER_POOL_ID,
            Username: email
        }).promise();

        // 可以发送带有此URL的电子邮件，而不是将其输出回用户！

        const url = `${process.env.URL}/sign-in/${email},${authChallenge}`;
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                demoUrl: url
            })
        };
    } catch (e) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Sorry, we could not find your account.',
                errorDetail: e.message
            })
        };
    }
};
