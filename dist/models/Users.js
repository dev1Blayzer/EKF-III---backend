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
exports.UsersResolver = exports.UsersModel = exports.UsersInput = exports.Users = void 0;
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const Model_1 = require("./Model");
let Users = class Users {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({
        description: "The name of the Users"
    }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
Users = __decorate([
    fireorm_1.Collection("users"),
    type_graphql_1.ObjectType({
        description: "The information for a Users document"
    })
], Users);
exports.Users = Users;
let UsersInput = class UsersInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UsersInput.prototype, "name", void 0);
UsersInput = __decorate([
    type_graphql_1.InputType({ description: "Editable Users data" })
], UsersInput);
exports.UsersInput = UsersInput;
class UsersModel extends Model_1.default {
    constructor() {
        super({
            docSchema: Users,
            inputType: UsersInput
        });
    }
}
exports.UsersModel = UsersModel;
let UsersResolver = class UsersResolver extends new UsersModel().Resolver {
};
UsersResolver = __decorate([
    type_graphql_1.Resolver(of => Users)
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=Users.js.map