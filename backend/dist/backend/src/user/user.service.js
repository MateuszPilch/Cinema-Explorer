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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const media_review_1 = require("../../../shared/models/media/media-review");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getAllMediaList(nickname, loaded) {
        const data = await this.userModel.findOne({ nickname });
        data.media_list.sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
        const res = data.media_list.slice(Number(loaded), Number(loaded) + 10);
        return res;
    }
    async getMediaListCount(nickname, filterKey, filterValue) {
        const data = await this.userModel.findOne({ nickname });
        if (filterKey && filterValue !== '') {
            data.media_list = data.media_list.filter((filter) => {
                return filter[filterKey].toString() == filterValue;
            });
        }
        return data.media_list.length;
    }
    async getFiltredMediaList(nickname, loaded, sort_by, filterKey, filterValue) {
        const data = await this.userModel.findOne({ nickname });
        if (filterKey && filterValue !== '') {
            data.media_list = data.media_list.filter((filter) => {
                return filter[filterKey].toString() == filterValue;
            });
        }
        switch (sort_by) {
            case 'rating_asc': {
                data.media_list.sort((a, b) => { return a.rating - b.rating; });
                break;
            }
            case 'rating_desc': {
                data.media_list.sort((a, b) => { return b.rating - a.rating; });
                break;
            }
            case 'createdAt_asc': {
                data.media_list.sort((a, b) => { return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); });
                break;
            }
            case 'createdAt_desc': {
                data.media_list.sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
                break;
            }
            default: {
                break;
            }
        }
        const res = data.media_list.slice(Number(loaded), Number(loaded) + 10);
        return res;
    }
    async getMediaReview(_id, media_id, media_type) {
        const data = await this.userModel.findById(_id);
        const res = (0, class_transformer_1.plainToInstance)(media_review_1.MediaReview, data.media_list.find(media => media.media_id === Number(media_id) && media.media_type === media_type));
        return res;
    }
    async setMediaReview(_id, mediaReview) {
        const data = await this.userModel.findById(_id);
        const mediaIndex = data.media_list.findIndex(media => media.media_id === mediaReview.media_id && media.media_type === mediaReview.media_type);
        if (mediaIndex === -1) {
            data.media_list.push({
                media_id: mediaReview.media_id,
                media_type: mediaReview.media_type,
                title: mediaReview.title,
                poster_path: mediaReview.poster_path,
                rating: mediaReview.rating,
                review: mediaReview.review,
                favourite: mediaReview.favourite,
                to_watch: mediaReview.to_watch,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        else {
            if (mediaReview.rating == 0 && !mediaReview.favourite && !mediaReview.to_watch) {
                data.media_list.splice(mediaIndex, 1);
            }
            else {
                data.media_list[mediaIndex].rating = mediaReview.rating;
                data.media_list[mediaIndex].review = mediaReview.review;
                data.media_list[mediaIndex].favourite = mediaReview.favourite;
                data.media_list[mediaIndex].to_watch = mediaReview.to_watch;
                data.media_list[mediaIndex].updatedAt = new Date();
            }
        }
        data.markModified('media_list');
        await data.save();
    }
    async getAvatar(nickname) {
        const data = await this.userModel.findOne({ nickname });
        const res = data.avatar;
        return res;
    }
    async setAvatar(_id, avatar) {
        const data = await this.userModel.findById(_id);
        data.avatar = avatar;
        data.save();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map