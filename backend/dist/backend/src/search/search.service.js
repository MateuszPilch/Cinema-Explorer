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
exports.SearchService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const search_data_1 = require("../../../shared/models/search-data");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
let SearchService = class SearchService {
    constructor(httpService, userModel) {
        this.httpService = httpService;
        this.userModel = userModel;
    }
    async getSearchResults(type, query, page) {
        let data = new search_data_1.SearchData();
        if (type != 'user') {
            const url = `https://api.themoviedb.org/3/search/${type}?language=pl-PL`;
            const headers = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.TMDB_API_CRED}`
                },
                params: {
                    query: query,
                    page: page
                }
            };
            data = (await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, headers))).data;
            data.results.forEach((a) => a.vote_average = Math.round(a.vote_average / 2 * 10) / 10);
            data.results.sort((a, b) => b.popularity - a.popularity);
        }
        if (type == 'multi' || type == 'user') {
            const users = await this.userModel.find({ nickname: new RegExp(query, 'i') }, 'nickname').skip((Number(page) - 1) * 20);
            users.forEach((user) => {
                data.total_results += 1;
                data.results.push({
                    nickname: user.nickname,
                    media_type: 'user',
                });
            });
        }
        const res = (0, class_transformer_1.plainToInstance)(search_data_1.SearchData, data, { excludeExtraneousValues: true });
        return res;
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [axios_1.HttpService, mongoose_2.Model])
], SearchService);
//# sourceMappingURL=search.service.js.map