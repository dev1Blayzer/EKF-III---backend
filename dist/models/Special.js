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
exports.SpecialResolver = exports.SpecialModel = exports.SpecialInput = exports.Special = void 0;
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const Model_1 = require("./Model");
let Special = class Special {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Special.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({
        description: "The name of the Specials"
    }),
    __metadata("design:type", String)
], Special.prototype, "name", void 0);
Special = __decorate([
    fireorm_1.Collection("specials"),
    type_graphql_1.ObjectType({
        description: "The information for a Specials document"
    })
], Special);
exports.Special = Special;
let SpecialInput = class SpecialInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SpecialInput.prototype, "name", void 0);
SpecialInput = __decorate([
    type_graphql_1.InputType({ description: "Editable Specials data" })
], SpecialInput);
exports.SpecialInput = SpecialInput;
class SpecialModel extends Model_1.default {
    constructor() {
        super({
            docSchema: Special,
            inputType: SpecialInput
        });
    }
}
exports.SpecialModel = SpecialModel;
let SpecialResolver = class SpecialResolver extends new SpecialModel().Resolver {
};
SpecialResolver = __decorate([
    type_graphql_1.Resolver(of => Special)
], SpecialResolver);
exports.SpecialResolver = SpecialResolver;
//# sourceMappingURL=Special.js.map