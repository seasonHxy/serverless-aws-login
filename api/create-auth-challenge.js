module.exports.handler = async(event) => {


    event.response.publicChallengeParameters = {
        email: event.request.userAttributes.email
    };


    // 触发器进行验证
    event.response.privateChallengeParameters = {
        challenge: event.request.userAttributes['custom:authChallenge']
    };

    return event;

};
