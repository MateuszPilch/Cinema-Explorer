"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapModule = void 0;
const common_1 = require("@nestjs/common");
const map_controller_1 = require("./map.controller");
const map_page_service_1 = require("./map-page/map-page.service");
const map_details_service_1 = require("./map-details/map-details.service");
const axios_1 = require("@nestjs/axios");
const mongoose_1 = require("@nestjs/mongoose");
const map_schema_1 = require("../schemas/map.schema");
const map_add_service_1 = require("./map-add/map-add.service");
let MapModule = class MapModule {
};
exports.MapModule = MapModule;
exports.MapModule = MapModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, mongoose_1.MongooseModule.forFeature([{ name: map_schema_1.Map.name, schema: map_schema_1.MapSchema }])],
        controllers: [map_controller_1.MapController],
        providers: [map_page_service_1.MapPageService, map_details_service_1.MapDetailsService, map_add_service_1.MapAddService],
    })
], MapModule);
//# sourceMappingURL=map.module.js.map