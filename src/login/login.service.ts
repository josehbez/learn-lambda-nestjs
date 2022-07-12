import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import config from '../common/config';
import { LoginDto } from './dtos/login.dto';
import { TokenDto } from './dtos/token.dto';
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');


@Injectable()
export class LoginService {

    async login(loginDto: LoginDto): Promise<TokenDto> {

        let userPool = new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: config.cognito_user_pool_id,
            ClientId: config.cognito_client_id
        })

        let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: loginDto.username,
            Pool: userPool
        })

        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: loginDto.username,
            Password: loginDto.password
        })

        let promise = new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: result => resolve(result),
                onFailure: err => reject(err),
                //    newPasswordRequired: 
            });
        })

        try {
            let res: any = await promise;
            // Opcion 2:
            let data: any = {
                type: "Bearer",
                accessToken: res["accessToken"]["jwtToken"]
            }
            let token = plainToInstance(TokenDto, data)
            return token;

        } catch (error) {
            console.error(error);
            return Promise.reject(error)
        }
        return;
    }
}
