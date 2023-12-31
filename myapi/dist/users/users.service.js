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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_knex_1 = require("nestjs-knex");
let UsersService = exports.UsersService = class UsersService {
    constructor(knex) {
        this.knex = knex;
    }
    async getUserById(loginId) {
        '';
        const { id } = loginId;
        try {
            const res = await this.knex
                .select('username')
                .from('users')
                .where('id', id);
            return res[0];
        }
        catch {
            return "invalid";
        }
    }
    async checkLogin(data) {
        const { username, password } = data;
        try {
            const res = await this.knex
                .select('id')
                .from('users')
                .where({ username, password });
            if (res.length > 0) {
                return res[0];
            }
            else {
                return { error: 'invalid' };
            }
        }
        catch {
            return { error: 'invalid' };
        }
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], UsersService);
//# sourceMappingURL=users.service.js.map