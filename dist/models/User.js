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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = exports.UserModel = exports.UserListQueryInput = exports.UserInput = exports.User = void 0;
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const Model_1 = require("./Model");
const Job_1 = require("./Job");
const listQuery_1 = require("../inputs/listQuery");
let User = class User {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, {
        nullable: true,
        description: "The user's email address"
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Field(() => [Job_1.Job]),
    __metadata("design:type", Array)
], User.prototype, "jobs", void 0);
User = __decorate([
    fireorm_1.Collection("users"),
    type_graphql_1.ObjectType({ description: "The information for a user" })
], User);
exports.User = User;
let UserInput = class UserInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "name", void 0);
UserInput = __decorate([
    type_graphql_1.InputType({ description: "Editable user data" })
], UserInput);
exports.UserInput = UserInput;
let UserListQueryInput = class UserListQueryInput extends listQuery_1.default {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], UserListQueryInput.prototype, "hasEmail", void 0);
UserListQueryInput = __decorate([
    type_graphql_1.InputType({
        description: "A custom set of params to use when doing list query"
    })
], UserListQueryInput);
exports.UserListQueryInput = UserListQueryInput;
class UserModel extends Model_1.default {
    constructor() {
        super({
            docSchema: User,
            inputType: UserInput,
            listQueryInputType: UserListQueryInput
        });
    }
    onBeforeAdd(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Before Add - ", data);
            return data;
        });
    }
    onAfterAdd(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("After Add - ", data);
            return data;
        });
    }
    onBeforeEdit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Before Edit - ", data);
            return data;
        });
    }
    onAfterEdit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("After Edit - ", data);
            return data;
        });
    }
    onBeforeDelete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Before Delete - ", data);
            return data;
        });
    }
    onAfterDelete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("After Delete - ", data);
            return data;
        });
    }
    onBeforeFind(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Before Find - ", id);
            return this.find(id);
        });
    }
    onAfterFind(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("After Find - ", data);
            return data;
        });
    }
    onBeforeList(data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Before List - ", data);
            let userListQuery = this.limit(data.limit ? data.limit : 15);
            if (data.hasEmail) {
                userListQuery = userListQuery.whereGreaterOrEqualThan("email", "");
            }
            return userListQuery.find();
        });
    }
    onAfterList(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("After List - ", data);
            return data;
        });
    }
    jobsForId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield new Job_1.JobModel()
                .ref()
                .where("user", "==", this.ref().doc(id))
                .get()).docs.map(doc => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
        });
    }
}
exports.UserModel = UserModel;
let UserResolver = class UserResolver extends new UserModel().Resolver {
    jobs(user) {
        return new UserModel().jobsForId(user.id);
    }
};
__decorate([
    type_graphql_1.FieldResolver({
        description: "A list of jobs the user is attached to."
    }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "jobs", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(of => User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=User.js.map