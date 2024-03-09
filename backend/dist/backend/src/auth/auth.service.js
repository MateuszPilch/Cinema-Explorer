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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const auth_schema_1 = require("../schemas/auth.schema");
const user_schema_1 = require("../schemas/user.schema");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwtService, authModel, userModel) {
        this.jwtService = jwtService;
        this.authModel = authModel;
        this.userModel = userModel;
    }
    async signup(signupDto) {
        const { nickname, email, password, confirmedPassword } = signupDto;
        const nicknameCheck = await this.authModel.findOne({ nickname });
        if (nicknameCheck) {
            throw new common_1.ConflictException('Ta nazwa użytkownika już istnieje');
        }
        const emailCheck = await this.authModel.findOne({ email });
        if (emailCheck) {
            throw new common_1.ConflictException('Ten adres email jest już zarejestrowany');
        }
        if (password !== confirmedPassword) {
            throw new common_1.BadRequestException("Hasło i potwierdzenie hasła nie zgadzają się");
        }
        else {
            const hashedPassword = await this.hashPassword(password);
            const _id = new mongoose_2.Types.ObjectId();
            const newAuth = await this.authModel.create({
                _id,
                nickname,
                email,
                password: hashedPassword,
            });
            const newUser = await this.userModel.create({
                _id,
                nickname,
            });
            const token = this.generateJwtToken(newAuth);
            return { token };
        }
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const auth = await this.authModel.findOne({ email });
        if (!auth) {
            throw new common_1.BadRequestException('Nieprawidłowy email lub hasło');
        }
        const isPasswordValid = await bcrypt.compare(password, auth.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Nieprawidłowy email lub hasło');
        }
        const token = this.generateJwtToken(auth);
        return { token };
    }
    async signupViaGoogle(signupViaGoogle) {
        const { nickname, email } = signupViaGoogle;
        const nicknameCheck = await this.authModel.findOne({ nickname });
        if (nicknameCheck) {
            throw new common_1.ConflictException('Ta nazwa użytkownika już istnieje');
        }
        const emailCheck = await this.authModel.findOne({ email });
        if (emailCheck) {
            throw new common_1.ConflictException('Ten adres email jest już zarejestrowany');
        }
        const _id = new mongoose_2.Types.ObjectId();
        const newAuth = await this.authModel.create({
            _id,
            nickname,
            email,
        });
        const newUser = await this.userModel.create({
            _id,
            nickname,
            email,
        });
        const token = this.generateJwtToken(newAuth);
        return { token };
    }
    async loginViaGoogle(loginViaGoogle) {
        const { email } = loginViaGoogle;
        const auth = await this.authModel.findOne({ email });
        if (!auth) {
            throw new common_1.BadRequestException('Nie istnieje takie konto');
        }
        const token = this.generateJwtToken(auth);
        return { token };
    }
    async validateViaGoogle(validateViaGoogleDto) {
        return validateViaGoogleDto;
    }
    generateJwtToken(auth) {
        const payload = {
            _id: auth._id,
            nickname: auth.nickname
        };
        return this.jwtService.sign(payload);
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 14);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(auth_schema_1.Auth.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map