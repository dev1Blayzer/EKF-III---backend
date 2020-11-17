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
exports.PlacesResolver = exports.PlacesModel = exports.PlacesInput = exports.Places = void 0;
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const Model_1 = require("./Model");
let Places = class Places {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Places.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({
        description: "The name of the Places"
    }),
    __metadata("design:type", String)
], Places.prototype, "name", void 0);
Places = __decorate([
    fireorm_1.Collection("places"),
    type_graphql_1.ObjectType({
        description: "The information for a Places document"
    })
], Places);
exports.Places = Places;
let PlacesInput = class PlacesInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PlacesInput.prototype, "name", void 0);
PlacesInput = __decorate([
    type_graphql_1.InputType({ description: "Editable Places data" })
], PlacesInput);
exports.PlacesInput = PlacesInput;
class PlacesModel extends Model_1.default {
    constructor() {
        super({
            docSchema: Places,
            inputType: PlacesInput
        });
    }
}
exports.PlacesModel = PlacesModel;
let PlacesResolver = class PlacesResolver extends new PlacesModel().Resolver {
};
PlacesResolver = __decorate([
    type_graphql_1.Resolver(of => Places)
], PlacesResolver);
exports.PlacesResolver = PlacesResolver;
//# sourceMappingURL=Places.js.map