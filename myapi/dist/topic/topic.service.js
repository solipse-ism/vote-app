"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_knex_1 = require("nestjs-knex");
let TopicService = exports.TopicService = class TopicService {
    constructor(knex) {
        this.knex = knex;
    }
    async updateTopic(data, topic) {
        const res = await this.knex
            .table('spread_head')
            .where('id', topic.id)
            .update(data);
        return res;
    }
    async checkID(data) {
        try {
            const voteID = await this.knex('spread_head').where('id', data.id);
            if (voteID.length > 0) {
                return { success: 'Successful Search' };
            }
            else {
                return { error: 'Invalid Vote ID' };
            }
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async getAllPublicTopics() {
        const data = await this.knex('spread_head')
            .select()
            .where('public_or_private', 'public');
        console.log(data);
        return data;
    }
    async getAllTopic(loginID) {
        const data = await this.knex('spread_head')
            .select()
            .where('create_by', loginID);
        return data;
    }
    async getOneTopic(topicID) {
        const data = await this.knex('spread_head')
            .select()
            .where('id', topicID);
        return data[0];
    }
    generateVoteCode() {
        const currentDatetime = new Date();
        const formattedDatetime = currentDatetime.getFullYear().toString() +
            this.padZero(currentDatetime.getMonth() + 1) +
            this.padZero(currentDatetime.getDate()) +
            this.padZero(currentDatetime.getHours()) +
            this.padZero(currentDatetime.getMinutes()) +
            this.padZero(currentDatetime.getSeconds());
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const prefix = letters[Math.floor(Math.random() * letters.length)];
        const digits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
        let voteCode = prefix + digits + formattedDatetime;
        return voteCode;
    }
    padZero(num) {
        return num.toString().padStart(2, '0');
    }
    async insTopic(data) {
        try {
            let isUnique = true;
            do {
                data.id = this.generateVoteCode();
                const usedID = await this.knex('spread_head').where('id', data.id);
                if (usedID.length > 0) {
                    isUnique = false;
                }
                else {
                    isUnique = true;
                    await this.knex('spread_head').insert(data);
                }
            } while (!isUnique);
            return 1;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
exports.TopicService = TopicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], TopicService);
//# sourceMappingURL=topic.service.js.map