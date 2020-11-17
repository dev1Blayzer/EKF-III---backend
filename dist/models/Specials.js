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
exports.SpecialsResolver = exports.SpecialsModel = exports.SpecialsInput = exports.Specials = void 0;
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const Model_1 = require("./Model");
let Specials = class Specials {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Specials.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({
        description: "The name of the Specials"
    }),
    __metadata("design:type", String)
], Specials.prototype, "name", void 0);
Specials = __decorate([
    fireorm_1.Collection("specials"),
    type_graphql_1.ObjectType({
        description: "The information for a Specials document"
    })
], Specials);
exports.Specials = Specials;
let SpecialsInput = class SpecialsInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SpecialsInput.prototype, "name", void 0);
SpecialsInput = __decorate([
    type_graphql_1.InputType({ description: "Editable Specials data" })
], SpecialsInput);
exports.SpecialsInput = SpecialsInput;
class SpecialsModel extends Model_1.default {
    constructor() {
        super({
            docSchema: Specials,
            inputType: SpecialsInput
        });
    }
}
exports.SpecialsModel = SpecialsModel;
let SpecialsResolver = class SpecialsResolver extends new SpecialsModel().Resolver {
};
SpecialsResolver = __decorate([
    type_graphql_1.Resolver(of => Specials)
], SpecialsResolver);
exports.SpecialsResolver = SpecialsResolver;
//# sourceMappingURL=Specials.js.map