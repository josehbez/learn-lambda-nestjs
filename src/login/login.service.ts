import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import config from '../common/config';
import { ConfirmDto } from './dtos/confirm.dto';
import { LoginDto } from './dtos/login.dto';
import { TokenDto } from './dtos/token.dto';
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');


@Injectable()
export class LoginService {
    userPool: any;

    constructor() {
        this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: config.cognito_user_pool_id,
            ClientId: config.cognito_client_id
        })
    }

    async confirm(loginDto: ConfirmDto): Promise<TokenDto> {
        return this.loginCognito(loginDto)
    }


    async login(loginDto: LoginDto): Promise<TokenDto> {
        return this.loginCognito(loginDto)
    }


    async loginCognito(loginDto: any) {

        let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: loginDto.username,
            Pool: this.userPool
        })

        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: loginDto.username,
            Password: loginDto.password
        })

        let promise = new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: result => resolve(result),
                onFailure: err => reject(err),
                newPasswordRequired: function (userAttributes: any, requireAttributes: any) {
                    console.log(userAttributes, requireAttributes)
                    
                    delete userAttributes.email_verified
                    delete userAttributes.email         
                    userAttributes.name = loginDto.name
                    
                    cognitoUser.completeNewPasswordChallenge(loginDto.newPassword, userAttributes, this)

                }
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
