import Auth from "@aws-amplify/auth";

export const config = {
    Auth: {
        region: "", // 区域
        userPoolId: "", //  
        userPoolWebClientId: "", // 应用ID
        authenticationFlowType: "CUSTOM_AUTH"
    }
};

Auth.configure(config);
