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
exports.TvController = void 0;
const common_1 = require("@nestjs/common");
const tv_details_service_1 = require("./tv-details/tv-details.service");
const tv_credits_service_1 = require("./tv-credits/tv-credits.service");
const tv_page_service_1 = require("./tv-page/tv-page.service");
const tv_search_filter_1 = require("../../../shared/models/tv/tv-search-filter");
let TvController = class TvController {
    constructor(tvPageService, tvDetailsService, tvCreditsService) {
        this.tvPageService = tvPageService;
        this.tvDetailsService = tvDetailsService;
        this.tvCreditsService = tvCreditsService;
    }
    getMovieData(params) {
        return this.tvPageService.getTvData(params);
    }
    getMovieGenres() {
        return this.tvPageService.GetTvGenres();
    }
    getTvDetails(id) {
        return this.tvDetailsService.getTvDetails(id);
    }
    getMovieImages(id) {
        return this.tvDetailsService.getTvImages(id);
    }
    getTvCredits(id) {
        return this.tvCreditsService.getTvCredits(id);
    }
    getTvCreditsShort(id) {
        return this.tvCreditsService.getTvCreditsShort(id);
    }
};
exports.TvController = TvController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tv_search_filter_1.TvSearchFilter]),
    __metadata("design:returntype", Promise)
], TvController.prototype, "getMovieData", null);
__decorate([
    (0, common_1.Get)('genres'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TvController.prototype, "getMovieGenres", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TvController.prototype, "getTvDetails", null);
__decorate([
    (0, common_1.Get)(':id/images'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TvController.prototype, "getMovieImages", null);
__decorate([
    (0, common_1.Get)(':id/credits'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TvController.prototype, "getTvCredits", null);
__decorate([
    (0, common_1.Get)(':id/credits_short'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TvController.prototype, "getTvCreditsShort", null);
exports.TvController = TvController = __decorate([
    (0, common_1.Controller)('tv'),
    __metadata("design:paramtypes", [tv_page_service_1.TvPageService,
        tv_details_service_1.TvDetailsService,
        tv_credits_service_1.TvCreditsService])
], TvController);
//# sourceMappingURL=tv.controller.js.map