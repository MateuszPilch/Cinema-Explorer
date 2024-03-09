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
exports.MapDataDto = void 0;
const class_validator_1 = require("class-validator");
class MapDataDto {
}
exports.MapDataDto = MapDataDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nazwa nie może być pusta' }),
    (0, class_validator_1.IsString)({ message: 'Nazwa musi składać się z liter' }),
    __metadata("design:type", String)
], MapDataDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^$|^\d{2}:\d{2}:\d{2}$/, { message: 'Nieprawidło wprowadzony czas' }),
    __metadata("design:type", String)
], MapDataDto.prototype, "runtime", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^$|^s\d{2}e\d{2}$/, { message: 'Nieprawidło wprowadzony odcinek' }),
    __metadata("design:type", String)
], MapDataDto.prototype, "episode", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Opis musi być znakiem' }),
    __metadata("design:type", String)
], MapDataDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nie wybrano lokacji' }),
    __metadata("design:type", String)
], MapDataDto.prototype, "center", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '' }),
    __metadata("design:type", String)
], MapDataDto.prototype, "radius", void 0);
//# sourceMappingURL=map-data.dto.js.map