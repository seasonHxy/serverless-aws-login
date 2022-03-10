const LINK_TIMEOUT = 30 * 60; // 链接的有效期

module.exports.handler = async(event) => {

    const [authChallenge, timestamp] = (event.request.privateChallengeParameters.challenge || '').split(',');

    if (event.request.challengeAnswer === authChallenge) {

        if (Number(timestamp) > (new Date()).valueOf() / 1000 - LINK_TIMEOUT) {
            event.response.answerCorrect = true;
            return event;
        }
    }


    event.response.answerCorrect = false;
    return event;

};
