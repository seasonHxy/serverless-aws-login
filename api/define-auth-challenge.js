module.exports.handler = async(event) => {

    // 若没有此用户
    if (event.request.userNotFound) {
        event.response.failAuthentication = true;
        event.response.issueTokens = false;
        return event;
    }

    // 检查认证结果
    if (event.request.session && event.request.session.length && event.request.session.slice(-1)[0].challengeResult === true) {
        
        event.response.failAuthentication = false;
        event.response.issueTokens = true;
        return event;
    }

    // 验证错误，重新发起验证
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = 'CUSTOM_CHALLENGE';
    return event;

};
