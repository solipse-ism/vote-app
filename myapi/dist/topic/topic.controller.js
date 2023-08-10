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
exports.TopicController = void 0;
const common_1 = require("@nestjs/common");
const topic_service_1 = require("./topic.service");
let TopicController = exports.TopicController = class TopicController {
    constructor(topicService) {
        this.topicService = topicService;
    }
    findAllTopic(params) {
        const res = this.topicService.getAllTopic(params.id);
        return res;
    }
    findOneTopic(params) {
        const res = this.topicService.getOneTopic(params.id);
        return res;
    }
    checkID(body) {
        const res = this.topicService.checkID(body);
        return res;
    }
    Put(body, param) {
        const data = body;
        const topic = {};
        topic.id = param.id;
        const res = this.topicService.updateTopic(data, topic);
        return res;
    }
    insTopic(body) {
        const res = this.topicService.insTopic(body);
        return res;
    }
};
__decorate([
    (0, common_1.Get)('all/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], TopicController.prototype, "findAllTopic", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], TopicController.prototype, "findOneTopic", null);
__decorate([
    (0, common_1.Post)('checkID/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], TopicController.prototype, "checkID", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], TopicController.prototype, "Put", null);
__decorate([
    (0, common_1.Post)('create/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], TopicController.prototype, "insTopic", null);
exports.TopicController = TopicController = __decorate([
    (0, common_1.Controller)('topic'),
    __metadata("design:paramtypes", [topic_service_1.TopicService])
], TopicController);
//# sourceMappingURL=topic.controller.js.map