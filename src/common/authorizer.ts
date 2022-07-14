import { CognitoJwtVerifier } from "aws-jwt-verify"
import { Context, Handler } from "aws-lambda"
import config from "./config"


const generatePolicy = (principalId: string, effect: string, resource: string) => {
    return {
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'excute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        },
        principalId: principalId
    }

}

export const handler: Handler = async (event: any, context: Context, callback) => {
    console.log("auth", event)
    if (!event.authorizationToken) {
        return callback('Unauthorized')
    }
    const verifier = CognitoJwtVerifier.create({
        userPoolId: config.cognito_user_pool_id,
        tokenUse: "access",
        clientId: config.cognito_client_id,
    });

    let token = String(event.authorizationToken).substring(7)
    try {
        const payload = await verifier.verify(token);
        console.log(payload)
        return callback(null, generatePolicy(payload.sub, 'Allow', event.methodArn))
    } catch (err){
        console.error(err)
    }
    return callback('Unauthorized')
}