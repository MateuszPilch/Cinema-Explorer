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
exports.MapDetailsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const map_details_1 = require("../../../../shared/models/map/map-details");
const map_schema_1 = require("../../schemas/map.schema");
let MapDetailsService = class MapDetailsService {
    constructor(httpService, mapModel) {
        this.httpService = httpService;
        this.mapModel = mapModel;
    }
    async getMediaDetails(media_type, media_id) {
        const url = `https://api.themoviedb.org/3/${media_type}/${media_id}?language=pl-PL`;
        const headers = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_CRED}`
            }
        };
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, headers));
        const details = (await this.mapModel.findOne({ media_type, media_id }));
        const mapData = details ? details.map_data : null;
        const res = (0, class_transformer_1.plainToInstance)(map_details_1.MapDetails, { ...data, mapData }, { excludeExtraneousValues: false });
        return res;
    }
    async getLocationCount(media_type, media_id) {
        const res = await this.mapModel.findOne({ media_type, media_id });
        return (res?.map_data?.length ?? 0);
    }
    async deleteMapLocation(user_id, media_type, media_id, location_id) {
        return await this.mapModel.updateOne({ media_type, media_id }, { $pull: { map_data: { _id: location_id, user_id: user_id.toString() } } });
    }
};
exports.MapDetailsService = MapDetailsService;
exports.MapDetailsService = MapDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(map_schema_1.Map.name)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        mongoose_2.Model])
], MapDetailsService);
//# sourceMappingURL=map-details.service.js.map