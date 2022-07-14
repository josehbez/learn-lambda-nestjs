import { Context, Handler } from "aws-lambda";


export const handler: Handler = async (event: any, context: Context, callback) => {
    return callback(null, {
        headers: {
            // Required for CORS support to work
            'Access-Control-Allow-Origin': '*',
            // Required for cookies, authorization headers with HTTPS
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ "ok": 1 })
    });
}