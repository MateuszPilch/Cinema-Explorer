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
exports.MapSchema = exports.Map = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class Image {
}
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Image.prototype, "encoding", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Image.prototype, "mimetype", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Buffer)
], Image.prototype, "buffer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Image.prototype, "size", void 0);
class MapData {
}
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MapData.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MapData.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MapData.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MapData.prototype, "runtime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MapData.prototype, "episode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MapData.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], MapData.prototype, "center", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], MapData.prototype, "radius", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Image)
], MapData.prototype, "image", void 0);
let Map = class Map extends mongoose_2.Document {
};
exports.Map = Map;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Map.prototype, "media_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Map.prototype, "media_type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Map.prototype, "map_data", void 0);
exports.Map = Map = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Map);
exports.MapSchema = mongoose_1.SchemaFactory.createForClass(Map);
//# sourceMappingURL=map.schema.js.map