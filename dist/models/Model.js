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
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const firebase_admin_1 = require("firebase-admin");
const pluralize = require("pluralize");
const date_fns_1 = require("date-fns");
const listQuery_1 = require("../inputs/listQuery");
/**
 * Add capitalization on the first letter of a string
 * @param str The string being capped
 */
function capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Remove capitalization of the first letter of a string
 * @param str The string being uncapped
 */
function uncapFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
/**
 * Create basic CRUD functionality with resolvers
 * @param suffix The name of the model
 * @param returnType The model types
 * @param model The actual model class
 * @param inputType The input types
 */
function createResolver(options) {
    var _a, _b, _c, _d, _e, _f, _g;
    const hookOptions = { type: "graphql" };
    if (options.inputType) {
        let CrudResolver = class CrudResolver {
            [_a = options.findQueryName
                ? options.findQueryName
                : `${uncapFirstLetter(options.modelName)}`](id, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (options.model.onAuth &&
                        typeof options.model.onAuth === "function" &&
                        !(yield options.model.onAuth("find", {
                            id,
                        }, Object.assign(Object.assign({}, hookOptions), { context }))))
                        return null;
                    const doc = options.model.onBeforeFind &&
                        typeof options.model.onBeforeFind === "function"
                        ? yield options.model.onBeforeFind(id, Object.assign(Object.assign({}, hookOptions), { context }))
                        : yield options.model.find(id);
                    return options.model.onAfterFind &&
                        typeof options.model.onAfterFind === "function"
                        ? yield options.model.onAfterFind(doc, Object.assign(Object.assign({}, hookOptions), { context }))
                        : doc;
                });
            }
            [_b = options.listQueryName
                ? options.listQueryName
                : `${uncapFirstLetter(options.collectionName)}`](data, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (options.model.onAuth &&
                        typeof options.model.onAuth === "function" &&
                        !(yield options.model.onAuth("list", data, Object.assign(Object.assign({}, hookOptions), { context }))))
                        return null;
                    const docs = options.model.onBeforeList &&
                        typeof options.model.onBeforeList === "function"
                        ? yield options.model.onBeforeList(data, Object.assign(Object.assign({}, hookOptions), { context }))
                        : yield options.model.paginate(data, options.model.onPaginate, Object.assign(Object.assign({}, hookOptions), { context }));
                    return options.model.onAfterList &&
                        typeof options.model.onAfterList === "function"
                        ? yield options.model.onAfterList(docs, Object.assign(Object.assign({}, hookOptions), { context, requestData: data }))
                        : docs;
                });
            }
            [_c = options.addMutationName
                ? options.addMutationName
                : `add${options.modelName}`](data, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (options.model.onAuth &&
                        typeof options.model.onAuth === "function" &&
                        !(yield options.model.onAuth("add", data, Object.assign(Object.assign({}, hookOptions), { context }))))
                        return null;
                    const docData = options.model.onBeforeAdd &&
                        typeof options.model.onBeforeAdd === "function"
                        ? yield options.model.onBeforeAdd(data, hookOptions)
                        : options.model.onBeforeWrite &&
                            typeof options.model.onBeforeWrite === "function"
                            ? yield options.model.onBeforeWrite(data, hookOptions)
                            : data;
                    if (docData === false) {
                        return null;
                    }
                    const newDoc = yield options.model.create(docData);
                    return options.model.onAfterAdd &&
                        typeof options.model.onAfterAdd === "function"
                        ? yield options.model.onAfterAdd(newDoc, Object.assign(Object.assign({}, hookOptions), { requestData: data }))
                        : options.model.onAfterWrite &&
                            typeof options.model.onAfterWrite === "function"
                            ? yield options.model.onAfterWrite(newDoc, Object.assign(Object.assign({}, hookOptions), { requestData: data }))
                            : newDoc;
                });
            }
            [_d = options.editMutationName
                ? options.editMutationName
                : `edit${options.modelName}`](id, data, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (options.model.onAuth &&
                        typeof options.model.onAuth === "function" &&
                        !(yield options.model.onAuth("edit", Object.assign(Object.assign({}, data), { id }), Object.assign(Object.assign({}, hookOptions), { context }))))
                        return null;
                    const docData = options.model.onBeforeEdit &&
                        typeof options.model.onBeforeEdit === "function"
                        ? yield options.model.onBeforeEdit(Object.assign({ id }, data), hookOptions)
                        : options.model.onBeforeWrite &&
                            typeof options.model.onBeforeWrite === "function"
                            ? yield options.model.onBeforeWrite(Object.assign({ id }, data), hookOptions)
                            : data;
                    if (docData === false) {
                        return null;
                    }
                    const doc = yield options.model.update(Object.assign({ id }, docData));
                    return options.model.onAfterEdit &&
                        typeof options.model.onAfterEdit === "function"
                        ? yield options.model.onAfterEdit(doc, Object.assign(Object.assign({}, hookOptions), { requestData: data }))
                        : options.model.onAfterWrite &&
                            typeof options.model.onAfterWrite === "function"
                            ? yield options.model.onAfterWrite(doc, Object.assign(Object.assign({}, hookOptions), { requestData: data }))
                            : doc;
                });
            }
            [_e = options.deleteMutationName
                ? options.deleteMutationName
                : `delete${options.modelName}`](id, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (options.model.onAuth &&
                        typeof options.model.onAuth === "function" &&
                        !(yield options.model.onAuth("list", { id }, Object.assign(Object.assign({}, hookOptions), { context }))))
                        return null;
                    const modelBefore = yield options.model.find(id);
                    if (options.model.onBeforeDelete &&
                        typeof options.model.onBeforeDelete === "function") {
                        const res = yield options.model.onBeforeDelete(Object.assign({ id }, modelBefore), hookOptions);
                        if (res === false) {
                            return Object.assign({ id }, modelBefore);
                        }
                    }
                    yield options.model.delete(id);
                    return options.model.onAfterDelete &&
                        typeof options.model.onAfterDelete === "function"
                        ? yield options.model.onAfterDelete(Object.assign({ id }, modelBefore), hookOptions)
                        : Object.assign({ id }, modelBefore);
                });
            }
        };
        __decorate([
            type_graphql_1.Authorized(options.authFind
                ? options.authFind
                : options.authRead
                    ? options.authRead
                    : []),
            type_graphql_1.Query((returns) => options.returnType, {
                nullable: true,
                description: `Get a specific ${options.modelName} document from the ${options.collectionName} collection.`,
            }),
            __param(0, type_graphql_1.Arg("id")),
            __param(1, type_graphql_1.Ctx()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, Object]),
            __metadata("design:returntype", Promise)
        ], CrudResolver.prototype, _a, null);
        __decorate([
            type_graphql_1.Authorized(options.authList
                ? options.authList
                : options.authRead
                    ? options.authRead
                    : []),
            type_graphql_1.Query((returns) => [options.returnType], {
                nullable: true,
                description: `Get a list of ${options.modelName} documents from the ${options.collectionName} collection.`,
            }),
            __param(0, type_graphql_1.Arg("data", () => options.listQueryInputType
                ? options.listQueryInputType
                : listQuery_1.default, { nullable: true })),
            __param(1, type_graphql_1.Ctx()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object, Object]),
            __metadata("design:returntype", Promise)
        ], CrudResolver.prototype, _b, null);
        __decorate([
            type_graphql_1.Authorized(options.authCreate
                ? options.authCreate
                : options.authWrite
                    ? options.authWrite
                    : []),
            type_graphql_1.Mutation((returns) => options.returnType),
            __param(0, type_graphql_1.Arg("data", () => options.inputType, {
                description: `Add a new ${options.modelName} document to the ${options.collectionName} collection.`,
            })),
            __param(1, type_graphql_1.Ctx()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object, Object]),
            __metadata("design:returntype", Promise)
        ], CrudResolver.prototype, _c, null);
        __decorate([
            type_graphql_1.Authorized(options.authUpdate
                ? options.authUpdate
                : options.authWrite
                    ? options.authWrite
                    : []),
            type_graphql_1.Mutation((returns) => options.returnType),
            __param(0, type_graphql_1.Arg("id", () => String, {
                description: `The ID of the ${options.modelName} document in the ${options.collectionName} collection`,
            })),
            __param(1, type_graphql_1.Arg("data", () => (options.editType ? options.editType : options.inputType), {
                description: `Update a ${options.modelName} document in the ${options.collectionName} collection.`,
            })),
            __param(2, type_graphql_1.Ctx()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, Object, Object]),
            __metadata("design:returntype", Promise)
        ], CrudResolver.prototype, _d, null);
        __decorate([
            type_graphql_1.Authorized(options.authDelete
                ? options.authDelete
                : options.authWrite
                    ? options.authWrite
                    : []),
            type_graphql_1.Mutation((returns) => options.returnType),
            __param(0, type_graphql_1.Arg("id", () => String, {
                description: `The ID of the ${options.modelName} document being deleted in the ${options.collectionName} collection`,
            })),
            __param(1, type_graphql_1.Ctx()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, Object]),
            __metadata("design:returntype", Promise)
        ], CrudResolver.prototype, _e, null);
        CrudResolver = __decorate([
            type_graphql_1.Resolver((of) => options.returnType)
        ], CrudResolver);
        return CrudResolver;
    }
    else {
        let BaseResolver = class BaseResolver {
            [_f = options.findQueryName
                ? options.findQueryName
                : `${uncapFirstLetter(options.modelName)}`](id, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (options.model.onAuth &&
                        typeof options.model.onAuth === "function" &&
                        !(yield options.model.onAuth("find", {
                            id,
                        }, Object.assign(Object.assign({}, hookOptions), { context }))))
                        return null;
                    const doc = options.model.onBeforeFind &&
                        typeof options.model.onBeforeFind === "function"
                        ? yield options.model.onBeforeFind(id, Object.assign(Object.assign({}, hookOptions), { context }))
                        : yield options.model.find(id);
                    return options.model.onAfterFind &&
                        typeof options.model.onAfterFind === "function"
                        ? yield options.model.onAfterFind(doc, Object.assign(Object.assign({}, hookOptions), { context }))
                        : doc;
                });
            }
            [_g = options.listQueryName
                ? options.listQueryName
                : `${uncapFirstLetter(options.collectionName)}`](data, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (options.model.onAuth &&
                        typeof options.model.onAuth === "function" &&
                        !(yield options.model.onAuth("list", data, Object.assign(Object.assign({}, hookOptions), { context }))))
                        return null;
                    const docs = options.model.onBeforeList &&
                        typeof options.model.onBeforeList === "function"
                        ? yield options.model.onBeforeList(data, Object.assign(Object.assign({}, hookOptions), { context }))
                        : yield options.model.paginate(data, {
                            context,
                            roles: options.authList
                                ? options.authList
                                : options.authRead
                                    ? options.authRead
                                    : [],
                        });
                    return options.model.onAfterList &&
                        typeof options.model.onAfterList === "function"
                        ? yield options.model.onAfterList(docs, Object.assign(Object.assign({}, hookOptions), { context }))
                        : docs;
                });
            }
        };
        __decorate([
            type_graphql_1.Authorized(options.authFind
                ? options.authFind
                : options.authRead
                    ? options.authRead
                    : []),
            type_graphql_1.Query((returns) => options.returnType, {
                nullable: true,
                description: `Get a specific ${options.modelName} document from the ${options.collectionName} collection.`,
            }),
            __param(0, type_graphql_1.Arg("id")),
            __param(1, type_graphql_1.Ctx()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, Object]),
            __metadata("design:returntype", Promise)
        ], BaseResolver.prototype, _f, null);
        __decorate([
            type_graphql_1.Authorized(options.authList
                ? options.authList
                : options.authRead
                    ? options.authRead
                    : []),
            type_graphql_1.Query((returns) => [options.returnType], {
                nullable: true,
                description: `Get a list of ${options.modelName} documents from the ${options.collectionName} collection.`,
            }),
            __param(0, type_graphql_1.Arg("data", () => options.listQueryInputType
                ? options.listQueryInputType
                : listQuery_1.default, { nullable: true })),
            __param(1, type_graphql_1.Ctx()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object, Object]),
            __metadata("design:returntype", Promise)
        ], BaseResolver.prototype, _g, null);
        BaseResolver = __decorate([
            type_graphql_1.Resolver((of) => options.returnType)
        ], BaseResolver);
        return BaseResolver;
    }
}
class default_1 {
    constructor(options) {
        this.options = options;
        this.timestamps = true;
        if (options) {
            this.collectionName = options.collectionName
                ? options.collectionName
                : pluralize(options.docSchema.name);
        }
        if (options && options.docSchema) {
            this.Resolver = createResolver(Object.assign(Object.assign({}, options), { returnType: options.docSchema, modelName: capFirstLetter(options.docSchema.name), collectionName: this.collectionName, model: this }));
        }
    }
    /**
     * Paginate a collection to page results
     */
    paginate(options = {}, onPaginate, hookOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.ref();
            const operatorMap = {
                whereEqual: "==",
                whereLessThan: "<",
                whereLessThanOrEqual: "<=",
                whereGreaterThan: ">",
                whereGreaterThanOrEqual: ">=",
                whereArrayContains: "array-contains",
                whereArrayContainsAny: "array-contains-any",
                whereIn: "in",
            };
            if (options.orderBy) {
                for (const order of options.orderBy ? options.orderBy.split(",") : []) {
                    const [orderBy, direction] = order.split(":");
                    query = query.orderBy(orderBy, direction ? direction : "asc");
                }
            }
            else if (this.timestamps) {
                query = query.orderBy("createdAt", "desc");
            }
            for (const where of [
                "whereEqual",
                "whereLessThan",
                "whereLessThanOrEqual",
                "whereGreaterThan",
                "whereGreaterThanOrEqual",
                "whereArrayContains",
                "whereArrayContainsAny",
                "whereIn",
            ]) {
                if (options[where]) {
                    options[where] =
                        typeof options[where] === "string"
                            ? JSON.parse(options[where])
                            : options[where];
                    for (const whereKey of Object.keys(options[where])) {
                        query = query.where(whereKey, operatorMap[where], date_fns_1.isValid(date_fns_1.parseISO(options[where][whereKey]))
                            ? new Date(Date.parse(options[where][whereKey]))
                            : options[where][whereKey]);
                    }
                }
            }
            if (onPaginate && typeof onPaginate === "function") {
                query = yield onPaginate(query, options, hookOptions);
            }
            if (options.next || options.back) {
                const params = (options.next ? options.next : options.back).split(",");
                let key = 0;
                for (const value of params) {
                    params[key] = date_fns_1.isValid(date_fns_1.parseISO(value))
                        ? new Date(Date.parse(value))
                        : value;
                    key = key + 1;
                }
                query = query[options.next ? "startAfter" : "endBefore"](...params);
            }
            if (options.limit) {
                query = query.limit(+options.limit);
            }
            const output = [];
            const res = yield query.get();
            for (const doc of res.docs) {
                const entity = Object.assign(Object.assign({}, doc.data()), { id: doc.id });
                if (entity.createdAt && this.timestamps) {
                    entity.createdAt = entity.createdAt.toDate().toISOString();
                }
                if (entity.updatedAt && this.timestamps) {
                    entity.updatedAt = entity.updatedAt.toDate().toISOString();
                }
                output.push(entity);
            }
            return output;
        });
    }
    /**
     * Create a new document and add it to the collection
     * @param modelObject The data to add to the document
     */
    create(modelObject) {
        return this.repo().create(this.timestamps
            ? Object.assign(Object.assign({}, modelObject), { createdAt: firebase_admin_1.firestore.FieldValue.serverTimestamp() }) : modelObject);
    }
    /**
     * Delete a document from a collection
     * @param id The id of the document to delete
     */
    delete(id) {
        return this.repo().delete(id);
    }
    /**
     * Execute a query on a collection
     * @param queries A list of queries
     * @param limitVal The limit of records to return
     * @param orderByObj The order of the records
     */
    execute(queries, limitVal, orderByObj) {
        return this.repo().execute(queries, limitVal, orderByObj);
    }
    /**
     * Get a specific document's data
     * @param id The id of the document
     */
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo().findById(id);
        });
    }
    /**
     * Get the name of the collection the model is attached to
     */
    getCollectionName() {
        return this.collectionName;
    }
    /**
     * Get the Firestore reference to the collection
     */
    ref() {
        return this.repo().firestoreColRef;
    }
    /**
     * Get the FireORM repo reference for the collection
     * @see https://fireorm.js.org/#/classes/basefirestorerepository
     */
    repo() {
        return fireorm_1.GetRepository(this.options.docSchema);
    }
    /**
     * Run a transaction on the collection
     * @param executor The transaction executor function
     */
    runTransaction(executor) {
        return this.repo().runTransaction(executor);
    }
    /**
     * Limit the number of records returned
     * @param limitTo The limit of data to return
     */
    limit(limitTo) {
        return this.repo().limit(limitTo);
    }
    /**
     * Order a list of documents by a specific property in ascending order
     * @param prop The property to order ascending by
     */
    orderByAscending(prop) {
        return this.repo().orderByAscending(prop);
    }
    /**
     * Order a list of documents by a specific property in descending order
     * @param prop The property to order descending by
     */
    orderByDescending(prop) {
        return this.repo().orderByDescending(prop);
    }
    /**
     * Update the data on a document from the collection
     * @param data The data to update on the document
     */
    update(data) {
        return this.repo().update(this.timestamps
            ? Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.firestore.FieldValue.serverTimestamp() }) : data);
    }
    /**
     * Get a list of documents where property equals value
     * @param prop The property to check eqaulity of
     * @param value The value to be equal to
     */
    whereEqualTo(prop, value) {
        return this.repo().whereEqualTo(prop, value);
    }
    /**
     * Get a list of documents where property greater than value
     * @param prop The property to check eqaulity of
     * @param value The value to be greater than to
     */
    whereGreaterThan(prop, value) {
        return this.repo().whereGreaterThan(prop, value);
    }
    /**
     * Get a list of documents where property less than value
     * @param prop The property to check eqaulity of
     * @param value The value to be less than to
     */
    whereLessThan(prop, value) {
        return this.repo().whereLessThan(prop, value);
    }
    /**
     * Get a list of documents where property less than or equal to value
     * @param prop The property to check eqaulity of
     * @param value The value to be less than or equal to
     */
    whereLessOrEqualThan(prop, value) {
        return this.repo().whereLessOrEqualThan(prop, value);
    }
    /**
     * Get a list of documents where property is equal to one of a list of values
     * @param prop The property to search for values
     * @param value The values to check for
     */
    whereArrayContains(prop, value) {
        return this.repo().whereArrayContains(prop, value);
    }
}
exports.default = default_1;
//# sourceMappingURL=Model.js.map