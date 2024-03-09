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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const media_review_dto_1 = require("./dto/media-review.dto");
const user_service_1 = require("./user.service");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllMediaList(params) {
        return this.userService.getAllMediaList(params.nickname, params.loaded);
    }
    getMediaListCount(params) {
        return this.userService.getMediaListCount(params.nickname, params.filterKey, params.filterValue);
    }
    getFiltredMediaList(params) {
        return this.userService.getFiltredMediaList(params.nickname, params.loaded, params.sort_by, params.filterKey, params.filterValue);
    }
    getMediaReview(req, params) {
        return this.userService.getMediaReview(req.user._id, params.media_id, params.media_type);
    }
    setMediaReview(req, mediaReview) {
        return this.userService.setMediaReview(req.user._id, mediaReview);
    }
    getAvatar(params) {
        return this.userService.getAvatar(params.nickname);
    }
    setAvatar(req, avatar) {
        return this.userService.setAvatar(req.user._id, avatar);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('allmedialist'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllMediaList", null);
__decorate([
    (0, common_1.Get)('medialistcount'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMediaListCount", null);
__decorate([
    (0, common_1.Get)('filtredmedialist'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFiltredMediaList", null);
__decorate([
    (0, common_1.Get)('mediareview'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMediaReview", null);
__decorate([
    (0, common_1.Post)('mediareview'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, media_review_dto_1.MediaReviewDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setMediaReview", null);
__decorate([
    (0, common_1.Get)('avatar'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAvatar", null);
__decorate([
    (0, common_1.Post)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setAvatar", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map