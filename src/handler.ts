import { NestFactory } from "@nestjs/core";
import { Context, Handler } from "aws-lambda";
import { Server } from "http";
import { AppModule } from "./app.module";
import { ExpressAdapter } from '@nestjs/platform-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { createServer, proxy } from "aws-serverless-express";

const express = require('express');

let cachedServer: Server;

const bootstrap = async () => {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
        nestApp.use(eventContext())
        await nestApp.init()
        cachedServer = createServer(expressApp, undefined, []);
    }
    return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
    cachedServer = await bootstrap();
    return proxy(cachedServer, event, context, 'PROMISE').promise;
}