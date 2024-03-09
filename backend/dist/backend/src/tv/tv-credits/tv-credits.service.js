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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TvCreditsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const media_credits_1 = require("../../../../shared/models/media/media-credits");
const class_transformer_1 = require("class-transformer");
let TvCreditsService = class TvCreditsService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getTvCredits(id) {
        const url = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=pl-PL`;
        const headers = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_CRED}`
            }
        };
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, headers));
        const res = (0, class_transformer_1.plainToInstance)(media_credits_1.MediaCredits, data, { excludeExtraneousValues: true });
        res.cast.sort((a, b) => a.order - b.order);
        res.crew.sort((a, b) => b.popularity - a.popularity);
        return res;
    }
    async getTvCreditsShort(id) {
        const url = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=pl-PL`;
        const headers = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_CRED}`
            }
        };
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, headers));
        let res = (0, class_transformer_1.plainToInstance)(media_credits_1.MediaCredits, data, { excludeExtraneousValues: true });
        res.cast.sort((a, b) => a.order - b.order);
        res.crew.sort((a, b) => b.popularity - a.popularity);
        res.cast = res.cast.slice(0, 6);
        res.crew = res.crew.slice(0, 6);
        return res;
    }
};
exports.TvCreditsService = TvCreditsService;
exports.TvCreditsService = TvCreditsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TvCreditsService);
//# sourceMappingURL=tv-credits.service.js.map