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
exports.MapController = void 0;
const common_1 = require("@nestjs/common");
const map_details_service_1 = require("./map-details/map-details.service");
const map_add_service_1 = require("./map-add/map-add.service");
const platform_express_1 = require("@nestjs/platform-express");
const map_page_service_1 = require("./map-page/map-page.service");
const map_data_dto_1 = require("./dto/map-data.dto");
const passport_1 = require("@nestjs/passport");
let MapController = class MapController {
    constructor(mapPageService, mapDetailsService, mapAddService) {
        this.mapPageService = mapPageService;
        this.mapDetailsService = mapDetailsService;
        this.mapAddService = mapAddService;
    }
    getAllLocations() {
        return this.mapPageService.getAllLocations();
    }
    getRandomLocation() {
        return this.mapPageService.getRandomLocation();
    }
    getMapDetails(media_type, media_id) {
        return this.mapDetailsService.getMediaDetails(media_type, media_id);
    }
    getLocationCount(media_type, media_id) {
        return this.mapDetailsService.getLocationCount(media_type, media_id);
    }
    getLocationDetails(media_type, media_id, location_id) {
        return this.mapPageService.getLocationDetails(media_type, media_id, location_id);
    }
    addMapLocation(req, media_type, media_id, mapData, image) {
        return this.mapAddService.addMediaLocation(req.user._id, media_type, media_id, mapData, image);
    }
    deleteMapLocation(req, media_type, media_id, location_id) {
        return this.mapDetailsService.deleteMapLocation(req.user._id, media_type, media_id, location_id);
    }
};
exports.MapController = MapController;
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MapController.prototype, "getAllLocations", null);
__decorate([
    (0, common_1.Get)('/random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MapController.prototype, "getRandomLocation", null);
__decorate([
    (0, common_1.Get)(':media_type/:media_id/details'),
    __param(0, (0, common_1.Param)('media_type')),
    __param(1, (0, common_1.Param)('media_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MapController.prototype, "getMapDetails", null);
__decorate([
    (0, common_1.Get)(':media_type/:media_id/count'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('media_type')),
    __param(1, (0, common_1.Param)('media_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MapController.prototype, "getLocationCount", null);
__decorate([
    (0, common_1.Get)(':media_type/:media_id/:location_id'),
    __param(0, (0, common_1.Param)('media_type')),
    __param(1, (0, common_1.Param)('media_id')),
    __param(2, (0, common_1.Param)('location_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MapController.prototype, "getLocationDetails", null);
__decorate([
    (0, common_1.Post)(':media_type/:media_id/add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('media_type')),
    __param(2, (0, common_1.Param)('media_id')),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, map_data_dto_1.MapDataDto, Object]),
    __metadata("design:returntype", Promise)
], MapController.prototype, "addMapLocation", null);
__decorate([
    (0, common_1.Post)(':media_type/:media_id/:location_id/delete'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('media_type')),
    __param(2, (0, common_1.Param)('media_id')),
    __param(3, (0, common_1.Param)('location_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], MapController.prototype, "deleteMapLocation", null);
exports.MapController = MapController = __decorate([
    (0, common_1.Controller)('map'),
    __metadata("design:paramtypes", [map_page_service_1.MapPageService,
        map_details_service_1.MapDetailsService,
        map_add_service_1.MapAddService])
], MapController);
//# sourceMappingURL=map.controller.js.map