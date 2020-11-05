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
exports.LogResolver = exports.LogModel = exports.Log = void 0;
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const Model_1 = require("./Model");
const User_1 = require("./User");
let Log = class Log {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Log.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({
        description: "The type of log"
    }),
    __metadata("design:type", String)
], Log.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field({
        description: "The name of the endpoint being accessed or event being responded to"
    }),
    __metadata("design:type", String)
], Log.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({
        nullable: true,
        description: "The input data sent to the endpoint"
    }),
    __metadata("design:type", String)
], Log.prototype, "input", void 0);
__decorate([
    type_graphql_1.Field({
        nullable: true,
        description: "The output data returned to the endpoint"
    }),
    __metadata("design:type", String)
], Log.prototype, "output", void 0);
__decorate([
    type_graphql_1.Field({
        description: "The URL of the page that called out to the API"
    }),
    __metadata("design:type", String)
], Log.prototype, "referrer", void 0);
__decorate([
    type_graphql_1.Field({
        description: "The amount of time it took the functionality to run"
    }),
    __metadata("design:type", Number)
], Log.prototype, "resolveTime", void 0);
__decorate([
    type_graphql_1.Field({
        nullable: true,
        description: "When the log was created"
    }),
    __metadata("design:type", String)
], Log.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, {
        nullable: true,
        description: "Who created the log"
    }),
    __metadata("design:type", User_1.User)
], Log.prototype, "createdBy", void 0);
Log = __decorate([
    fireorm_1.Collection("logs"),
    type_graphql_1.ObjectType({
        description: "The information for an event logged on the system"
    })
], Log);
exports.Log = Log;
class LogModel extends Model_1.default {
    constructor() {
        super({
            docSchema: Log
        });
    }
}
exports.LogModel = LogModel;
let LogResolver = class LogResolver extends new LogModel().Resolver {
    createdBy(data) {
        return new User_1.UserModel().find(data.createdBy.id);
    }
};
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Log]),
    __metadata("design:returntype", Promise)
], LogResolver.prototype, "createdBy", null);
LogResolver = __decorate([
    type_graphql_1.Resolver(of => Log)
], LogResolver);
exports.LogResolver = LogResolver;
//# sourceMappingURL=Log.js.map