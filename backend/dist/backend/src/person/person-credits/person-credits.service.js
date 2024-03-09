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
exports.PersonCreditsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const rxjs_1 = require("rxjs");
const person_credits_1 = require("../../../../shared/models/person/person-credits");
let PersonCreditsService = class PersonCreditsService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getPersonCredits(id) {
        const url = `https://api.themoviedb.org/3/person/${id}/combined_credits?language=pl-PL`;
        const headers = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_CRED}`
            }
        };
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, headers));
        data.cast.sort((a, b) => b.vote_count - a.vote_count);
        data.crew.sort((a, b) => b.popularity - a.popularity);
        const res = (0, class_transformer_1.plainToInstance)(person_credits_1.PersonCredits, data, { excludeExtraneousValues: true });
        return res;
    }
};
exports.PersonCreditsService = PersonCreditsService;
exports.PersonCreditsService = PersonCreditsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PersonCreditsService);
//# sourceMappingURL=person-credits.service.js.map