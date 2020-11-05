"use strict";
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
function auth({ context }, roles) {
    return __awaiter(this, void 0, void 0, function* () {
        return true;
        // if (context.env === "local") {
        //   return true;
        // }
        // if (!context.token) {
        //   return false;
        // }
        // const decodedToken = await admin.auth().verifyIdToken(context.token);
        // await admin.auth().setCustomUserClaims(decodedToken.uid, {
        //   role: "admin"
        // });
        // const user = await admin.auth().getUser(decodedToken.uid);
        // const canAccessData =
        //   roles && roles.length > 0
        //     ? user && user.customClaims && user.customClaims["role"]
        //       ? roles.indexOf(user.customClaims["role"]) >= 0
        //       : false
        //     : true;
        // return canAccessData;
    });
}
exports.default = auth;
//# sourceMappingURL=auth.js.map