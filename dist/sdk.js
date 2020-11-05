"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.getSdk = exports.TieUserToJobDocument = exports.FindUserDocument = exports.EditUserDocument = void 0;
var graphql_1 = require("graphql");
var graphql_tag_1 = require("graphql-tag");
exports.EditUserDocument = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation EditUser($id: String!, $data: UserInput!) {\n  editUser(id: $id, data: $data) {\n    id\n  }\n}\n    "], ["\n    mutation EditUser($id: String!, $data: UserInput!) {\n  editUser(id: $id, data: $data) {\n    id\n  }\n}\n    "])));
exports.FindUserDocument = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query findUser($userId: String!) {\n  user(id: $userId) {\n    id\n    name\n  }\n}\n    "], ["\n    query findUser($userId: String!) {\n  user(id: $userId) {\n    id\n    name\n  }\n}\n    "])));
exports.TieUserToJobDocument = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    mutation TieUserToJob($data: TieUserToJobInput!) {\n  tieUserToJob(data: $data) {\n    id\n    customer\n    user {\n      id\n      name\n    }\n  }\n}\n    "], ["\n    mutation TieUserToJob($data: TieUserToJobInput!) {\n  tieUserToJob(data: $data) {\n    id\n    customer\n    user {\n      id\n      name\n    }\n  }\n}\n    "])));
var defaultWrapper = function (sdkFunction) { return sdkFunction(); };
function getSdk(client, withWrapper) {
    if (withWrapper === void 0) { withWrapper = defaultWrapper; }
    return {
        EditUser: function (variables) {
            return withWrapper(function () { return client.request(graphql_1.print(exports.EditUserDocument), variables); });
        },
        findUser: function (variables) {
            return withWrapper(function () { return client.request(graphql_1.print(exports.FindUserDocument), variables); });
        },
        TieUserToJob: function (variables) {
            return withWrapper(function () { return client.request(graphql_1.print(exports.TieUserToJobDocument), variables); });
        }
    };
}
exports.getSdk = getSdk;
var templateObject_1, templateObject_2, templateObject_3;
