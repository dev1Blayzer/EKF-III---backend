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
exports.PlaceResolver = exports.PlaceModel = exports.PlaceInput = exports.Place = void 0;
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const Model_1 = require("./Model");
let Place = class Place {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Place.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({
        description: "The name of the Places"
    }),
    __metadata("design:type", String)
], Place.prototype, "name", void 0);
Place = __decorate([
    fireorm_1.Collection("places"),
    type_graphql_1.ObjectType({
        description: "The information for a Places document"
    })
], Place);
exports.Place = Place;
let PlaceInput = class PlaceInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PlaceInput.prototype, "name", void 0);
PlaceInput = __decorate([
    type_graphql_1.InputType({ description: "Editable Places data" })
], PlaceInput);
exports.PlaceInput = PlaceInput;
class PlaceModel extends Model_1.default {
    constructor() {
        super({
            docSchema: Place,
            inputType: PlaceInput
        });
    }
}
exports.PlaceModel = PlaceModel;
let PlaceResolver = class PlaceResolver extends new PlaceModel().Resolver {
};
PlaceResolver = __decorate([
    type_graphql_1.Resolver(of => Place)
], PlaceResolver);
exports.PlaceResolver = PlaceResolver;
//# sourceMappingURL=Place.js.map