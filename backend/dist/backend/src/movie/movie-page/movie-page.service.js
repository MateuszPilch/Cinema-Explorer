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
exports.MoviePageService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const rxjs_1 = require("rxjs");
const media_data_1 = require("../../../../shared/models/media/media-data");
const movie_genres_1 = require("../../../../shared/models/movie/movie-genres");
let MoviePageService = class MoviePageService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getMovieData(params) {
        const url = `https://api.themoviedb.org/3/discover/movie?language=pl-PL`;
        const headers = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_CRED}`
            },
            params
        };
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, headers));
        data.results.forEach((a) => a.vote_average = Math.round(a.vote_average / 2 * 10) / 10);
        const res = (0, class_transformer_1.plainToInstance)(media_data_1.MediaData, data, { excludeExtraneousValues: true });
        return res;
    }
    async GetMovieGenres() {
        const url = `https://api.themoviedb.org/3/genre/movie/list?language=pl-PL`;
        const headers = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_CRED}`
            }
        };
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, headers));
        const res = (0, class_transformer_1.plainToInstance)(movie_genres_1.MovieGenres, data.genres, { excludeExtraneousValues: true });
        return res;
    }
};
exports.MoviePageService = MoviePageService;
exports.MoviePageService = MoviePageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], MoviePageService);
//# sourceMappingURL=movie-page.service.js.map