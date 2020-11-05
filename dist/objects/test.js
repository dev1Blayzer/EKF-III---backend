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
exports.Test = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../models/User");
let Test = class Test {
};
__decorate([
    type_graphql_1.Field({
        nullable: true,
        description: "The test's email address"
    }),
    __metadata("design:type", String)
], Test.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, {
        nullable: true,
        description: "The user's document attached to the donor"
    }),
    __metadata("design:type", User_1.User)
], Test.prototype, "user", void 0);
Test = __decorate([
    type_graphql_1.ObjectType({
        description: "The test info for a user."
    })
], Test);
exports.Test = Test;
//# sourceMappingURL=test.js.map