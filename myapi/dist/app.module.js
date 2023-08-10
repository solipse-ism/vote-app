"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nestjs_knex_1 = require("nestjs-knex");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
const topic_service_1 = require("./topic/topic.service");
const topic_controller_1 = require("./topic/topic.controller");
const vote_controller_1 = require("./vote/vote.controller");
const vote_service_1 = require("./vote/vote.service");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_knex_1.KnexModule.forRoot({
                config: {
                    client: 'mysql2',
                    connection: {
                        host: '127.0.0.1',
                        user: 'root',
                        password: 'password',
                        database: 'voting_application',
                    },
                },
            }),
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController, topic_controller_1.TopicController, vote_controller_1.VoteController],
        providers: [app_service_1.AppService, users_service_1.UsersService, topic_service_1.TopicService, vote_service_1.VoteService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map